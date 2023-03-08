import type {
  IAuth0Owner,
  ICreateElementData,
  IElement,
  IElementService,
  IUpdateElementData,
  RenderType,
} from '@codelab/frontend/abstract/core'
import {
  elementRef,
  getBuilderService,
  getComponentService,
  IElementDTO,
  IRenderTypeKind,
} from '@codelab/frontend/abstract/core'
import { getAtomService } from '@codelab/frontend/domain/atom'
import { getPropService } from '@codelab/frontend/domain/prop'
import { getTypeService, InterfaceType } from '@codelab/frontend/domain/type'
import { runSequentially } from '@codelab/frontend/shared/utils'
import type {
  ElementCreateInput,
  ElementUpdateInput,
  ElementWhere,
} from '@codelab/shared/abstract/codegen'
import { RenderedComponentFragment } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { createUniqueName, isNonNullable } from '@codelab/shared/utils'
import { computed } from 'mobx'
import {
  _async,
  _await,
  idProp,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import type { UpdateElementsMutationVariables } from '../graphql/element.endpoints.graphql.gen'
import { ElementRepository } from '../services/element.repository'
import { makeAutoIncrementedName } from '../utils'
import {
  getRenderTypeApi,
  makeDefaultProps,
  makeDuplicateInput,
} from './api.utils'
import { elementApi } from './apis'
import { Element } from './element.model'
import {
  CreateElementModalService,
  ElementModalService,
  UpdateElementModalService,
} from './element-modal.service'

/**
 * We will have a single ElementService that contains all elements from
 *
 * - PageElementTree
 * - ComponentElementTree
 */
@model('@codelab/ElementService')
export class ElementService
  extends Model({
    clonedElements: prop(() => objectMap<IElement>()),
    createModal: prop(() => new CreateElementModalService({})),
    deleteModal: prop(() => new ElementModalService({})),
    elementRepository: prop(() => new ElementRepository({})),
    /**
     * Contains all elements
     *
     * - Elements part of rootTree
     * - Elements that are detached
     */
    elements: prop(() => objectMap<IElement>()),
    id: idProp,
    updateModal: prop(() => new UpdateElementModalService({})),
  })
  implements IElementService
{
  @computed
  private get atomService() {
    return getAtomService(this)
  }

  @computed
  private get componentService() {
    return getComponentService(this)
  }

  @computed
  private get typeService() {
    return getTypeService(this)
  }

  @computed
  private get builderService() {
    return getBuilderService(this)
  }

  @computed
  private get propService() {
    return getPropService(this)
  }

  @modelFlow
  @transaction
  public getAll = _async(function* (this: ElementService, where: ElementWhere) {
    const elements = yield* _await(this.elementRepository.find(where))

    return elements.map((element) => this.add(element))
  })

  @modelAction
  public loadComponentTree(component: RenderedComponentFragment) {
    const elements = [
      component.rootElement,
      ...component.rootElement.descendantElements,
    ]

    const hydratedElements = elements.map((element) => this.add(element))
    const rootElement = this.element(component.rootElement.id)

    return { hydratedElements, rootElement }
  }

  @modelAction
  add = (elementDTO: IElementDTO): IElement => {
    // console.debug('ElementService.writeCache', elementDTO)

    // if (renderAtomType) {
    //   this.atomService.add(renderAtomType)
    // }

    // if (parentComponent) {
    //   this.componentService.add(parentComponent)
    // }

    // if (renderComponentType) {
    //   this.componentService.add(renderComponentType)
    // }

    // if (props) {
    //   this.propService.add(props)
    // }
    const element = Element.create(elementDTO)

    this.elements.set(element.id, element)

    // this.writeClonesCache(elementDTO)

    return element
  }

  /**
   * We need a separate create function for element trees
   */
  @modelFlow
  @transaction
  create = _async(function* (this: ElementService, data: ICreateElementData) {
    // console.log(atom)
    // console.log(atomRef(atom))
    const parent = this.elements.get(data.parentElement?.id ?? '')
    const name = createUniqueName(data.name, parent?.baseId ?? '')

    const renderTypeApi = getRenderTypeApi({
      atomService: this.atomService,
      componentService: this.componentService,
      renderType: data.renderType,
    })

    const elementProps = this.propService.add({
      data: makeDefaultProps(renderTypeApi?.current),
      id: v4(),
    })

    console.log(elementProps)

    const element = this.add({
      ...data,
      name,
      parent,
      props: elementProps,
    })

    console.log(element)

    yield* _await(this.elementRepository.add(element))

    return element
  })

  @modelAction
  public element(id: string) {
    const element = this.maybeElement(id)

    if (!element) {
      throw new Error('Missing element')
    }

    return element
  }

  @modelAction
  public maybeElement(id: string) {
    return this.elements.get(id) || this.clonedElements.get(id)
  }

  @modelFlow
  @transaction
  update = _async(function* (
    this: ElementService,
    { id, props, ...elementData }: IUpdateElementData,
  ) {
    const element = this.elements.get(id)!

    element.props.current.writeCache(props ?? {})

    element.writeCache({
      ...elementData,
    })

    yield* _await(this.elementRepository.update(element))

    return element
  })

  /**
   * Directly uses generated GraphQL operations
   */
  @modelFlow
  @transaction
  patchElement = _async(function* (
    this: ElementService,
    entity: IEntity,
    input: ElementUpdateInput,
  ) {
    const {
      updateElements: { elements },
    } = yield* _await(
      elementApi.UpdateElements({
        update: input,
        where: { id: entity.id },
      }),
    )

    return elements.map((element) => this.add(element))[0]!
  })

  @modelFlow
  @transaction
  private detachElementFromElementTree = _async(function* (
    this: ElementService,
    elementId: string,
  ) {
    /**
Detaches element from an element tree. Will perform 3 conditional checks to see which specific detach to call

- Detach from parent
- Detach from next sibling
- Detach from prev sibling
- Connect prev to next
*/
    const element = this.maybeElement(elementId)

    if (!element) {
      console.warn(`Can't find element id ${elementId}`)

      return
    }

    /**
parent
  prev
  element
  next
*/
    const updateElementInputs = [
      // Detach from parent
      element.makeDetachParentInput(),
      // Detach from next sibling
      element.makeDetachNextSiblingInput(),
      // Detach from prev sibling
      element.makeDetachPrevSiblingInput(),
    ]

    const updateElementCacheFns: Array<() => void> = [
      // Detach from parent
      element.detachParent(),
      // Attach next to prev
      element.attachPrevToNextSibling(),
      // Detach from next sibling
      element.detachNextSibling(),
      // Detach from prev sibling
      element.detachPrevSibling(),
    ]

    const updateElementRequests = updateElementInputs
      .filter(isNonNullable)
      .map((input) => elementApi.UpdateElements(input))

    yield* _await(Promise.all(updateElementRequests))
    updateElementCacheFns.forEach((fn) => fn())
  })

  /**
   * Moves an element to the next postion of target element
   */
  @modelFlow
  @transaction
  public moveElementAsNextSibling = _async(
    runSequentially(
      'elementTransaction',
      function* (
        this: ElementService,
        {
          element,
          targetElement,
        }: Parameters<IElementService['moveElementAsNextSibling']>[0],
      ) {
        const target = this.element(targetElement.id)

        if (target.nextSibling?.getRefId() === element.id) {
          return
        }

        yield* _await(this.detachElementFromElementTree(element.id))

        yield* _await(
          this.attachElementAsNextSibling({ element, targetElement }),
        )
      },
    ),
  )

  @modelFlow
  @transaction
  public moveElementAsFirstChild = _async(
    runSequentially(
      'elementTransaction',
      function* (
        this: ElementService,
        {
          element,
          parentElement,
        }: Parameters<IElementService['moveElementAsFirstChild']>[0],
      ) {
        yield* _await(this.detachElementFromElementTree(element.id))

        yield* _await(
          this.attachElementAsFirstChild({ element, parentElement }),
        )
      },
    ),
  )

  @modelFlow
  @transaction
  public createElementAsFirstChild = _async(
    runSequentially(
      'elementTransaction',
      function* (this: ElementService, data: ICreateElementData) {
        if (!data.parentElement?.id) {
          throw new Error("Parent element id doesn't exist")
        }

        const element = yield* _await(this.create(data))

        if (!element) {
          throw new Error('Create element failed')
        }

        yield* _await(
          this.attachElementAsFirstChild({
            element,
            parentElement: data.parentElement,
          }),
        )

        return element
      },
    ),
  )

  @modelFlow
  @transaction
  public createElementAsNextSibling = _async(
    runSequentially(
      'elementTransaction',
      function* (this: ElementService, data: ICreateElementData) {
        const element = yield* _await(this.create(data))

        if (!data.prevSibling) {
          throw new Error('Missing previous sibling')
        }

        yield* _await(
          this.attachElementAsNextSibling({
            element,
            targetElement: data.prevSibling,
          }),
        )

        return element
      },
    ),
  )

  @modelFlow
  @transaction
  private attachElementAsNextSibling = _async(function* (
    this: ElementService,
    {
      element: existingElement,
      targetElement: existingTargetElement,
    }: {
      element: IEntity
      targetElement: IEntity
    },
  ) {
    const element = this.element(existingElement.id)
    const targetElement = this.element(existingTargetElement.id)
    const updateElementInputs: Array<UpdateElementsMutationVariables> = []
    const updateElementCacheFns: Array<() => void> = []

    // Attach to parent
    if (targetElement.parent) {
      updateElementCacheFns.push(element.attachToParent(targetElement.parent))
    }

    /**
     * [target]-nextSibling
     * target-[element]-nextSibling
     * element appends to nextSibling
     */
    if (targetElement.nextSibling) {
      updateElementInputs.push(
        element.makeAppendSiblingInput(targetElement.nextSibling.id),
      )
      updateElementCacheFns.push(
        element.appendSibling(targetElement.nextSibling),
      )

      /** [element]-nextSibling */
      updateElementInputs.push(
        targetElement.nextSibling.current.makePrependSiblingInput(element.id),
      )
      updateElementCacheFns.push(
        targetElement.nextSibling.current.prependSibling(elementRef(element)),
      )
    }

    updateElementInputs.push(element.makePrependSiblingInput(targetElement.id))
    updateElementCacheFns.push(
      element.prependSibling(elementRef(targetElement.id)),
    )

    const updateElementRequests = updateElementInputs
      .filter(isNonNullable)
      .map((input) => elementApi.UpdateElements(input))

    yield* _await(Promise.all(updateElementRequests))
    updateElementCacheFns.forEach((fn) => fn())
  })

  /**
   * Moves an element to the next position of children[0] of parent children element
   */
  @modelFlow
  @transaction
  private attachElementAsFirstChild = _async(function* (
    this: ElementService,
    {
      element: existingElement,
      parentElement: exstingParentElement,
    }: {
      element: IEntity
      parentElement: IEntity
    },
  ) {
    const element = this.element(existingElement.id)
    const parentElement = this.element(exstingParentElement.id)
    const updateElementInputs = []
    const updateElementCacheFns: Array<() => void> = []

    /**
parentElement
  firstChild

parentElement
  [element]
  firstChild

element is new parentElement's first child
     */
    if (parentElement.firstChild) {
      updateElementInputs.push(
        element.makeAppendSiblingInput(parentElement.firstChild.id),
      )
      updateElementCacheFns.push(
        element.appendSibling(elementRef(parentElement.firstChild.id)),
      )
    }

    // attach to parent
    updateElementInputs.push(
      element.makeAttachToParentAsFirstChildInput(elementRef(parentElement.id)),
    )
    updateElementCacheFns.push(
      element.attachToParentAsFirstChild(elementRef(parentElement.id)),
    )

    const updateElementRequests = updateElementInputs.map((input) =>
      elementApi.UpdateElements(input),
    )

    yield* _await(Promise.all(updateElementRequests))
    updateElementCacheFns.forEach((fn) => fn())
  })

  @modelFlow
  @transaction
  public moveElementToAnotherTree = _async(
    runSequentially(
      'elementTransaction',
      function* (
        this: ElementService,
        {
          element: { id: elementId },
          targetElement: { id: targetElementId },
          dropPosition,
        }: Parameters<IElementService['moveElementToAnotherTree']>[0],
      ) {
        const targetElement = this.element(targetElementId)
        let element = this.maybeElement(elementId)

        if (!element) {
          const elementTree = Element.getElementTree(targetElement)

          const existingInstances = elementTree?.elements.filter(
            ({ renderType }) => renderType?.id === elementId,
          )

          const component = this.componentService.component(elementId)

          if (!component) {
            return
          }

          const componentInstanceCounter = existingInstances?.length
            ? ` ${existingInstances.length}`
            : ''

          const name = `${component.name}${componentInstanceCounter}`

          const renderType: RenderType = {
            id: component.id,
            kind: IRenderTypeKind.Component,
          }

          const parentElementId = targetElement.id
          const data = { id: v4(), name, parentElementId, renderType }

          element = yield* _await(this.create(data))
        } else {
          yield* _await(this.detachElementFromElementTree(element.id))
        }

        const insertAfterId = targetElement.children[dropPosition]?.id

        if (!insertAfterId || dropPosition === 0) {
          yield* _await(
            this.attachElementAsFirstChild({
              element,
              parentElement: targetElement,
            }),
          )
        } else {
          yield* _await(
            this.attachElementAsNextSibling({
              element,
              targetElement: { id: insertAfterId },
            }),
          )
        }

        Element.getElementTree(element)?.removeElements([
          element,
          ...element.descendants,
        ])

        Element.getElementTree(targetElement)?.addElements([
          element,
          ...element.descendants,
        ])
      },
    ),
  )

  @modelFlow
  @transaction
  deleteElementSubgraph = _async(function* (
    this: ElementService,
    subRoot: IEntity,
  ) {
    const subRootElement = elementRef(subRoot.id).current

    const descendantElements = subRootElement.getDescendantRefs.map(
      (pageRootElement) => pageRootElement.current,
    )

    descendantElements.reverse().forEach((element) => {
      this.elements.delete(element.id)
      this.removeClones(element.id)
    })

    yield* _await(this.elementRepository.delete(descendantElements))

    return descendantElements
  })

  @computed
  get elementNames() {
    return [...this.elements.values()].map((element) => element.name)
  }

  private async recursiveDuplicate(element: IElement, parentElement: IElement) {
    const duplicateName = makeAutoIncrementedName(
      this.builderService.activeElementTree?.elements.map(({ name }) => name) ||
        [],
      element.name,
      true,
    )

    const createInput: ElementCreateInput = makeDuplicateInput(
      element,
      duplicateName,
    )

    const {
      createElements: {
        elements: [createdElement],
      },
    } = await elementApi.CreateElements({ input: createInput })

    if (!createdElement) {
      throw new Error('No elements created')
    }

    const elementModel = this.add(createdElement)
    const lastChild = parentElement.children[parentElement.children.length - 1]

    if (!lastChild) {
      await this.attachElementAsFirstChild({
        element: elementModel,
        parentElement,
      })
    } else {
      await this.attachElementAsNextSibling({
        element: elementModel,
        targetElement: lastChild,
      })
    }

    const children = await Promise.all(
      element.children.map((child) =>
        this.recursiveDuplicate(child, elementModel),
      ),
    )

    const oldToNewIdMap: Map<string, IElement> = children.reduce(
      (acc, curElementModel) => new Map([...acc, ...curElementModel]),
      new Map([[element.id, elementModel]]),
    )

    return oldToNewIdMap
  }

  @modelFlow
  @transaction
  public cloneElement = _async(
    runSequentially(
      'elementTransaction',
      function* (
        this: ElementService,
        targetElement: IElement,
        targetParent: IElement,
      ) {
        const oldToNewIdMap = yield* _await(
          this.recursiveDuplicate(targetElement, targetParent),
        )

        const createdElements = [...oldToNewIdMap.values()]
        // re-attach the prop map bindings now that we have the new ids
        const allInputs = [targetElement, ...targetElement.descendants]

        for (const inputElement of allInputs) {
          const newId = oldToNewIdMap.get(inputElement.id)?.id

          if (!newId) {
            throw new Error(`Could not find new id for ${inputElement.id}`)
          }

          const duplicated = createdElements.find(
            (element) => element.id === newId,
          )

          if (!duplicated) {
            throw new Error(`Could not find duplicated element ${newId}`)
          }
        }

        return createdElements
      },
    ),
  )

  @modelFlow
  @transaction
  public convertElementToComponent = _async(
    runSequentially(
      'elementTransaction',
      function* (this: ElementService, element: IElement, owner: IAuth0Owner) {
        if (!element.parent) {
          throw new Error("Can't convert root element")
        }

        const { name, parent: parentElement, prevSibling, label } = element

        // 1. detach the element from the element tree
        yield* _await(this.detachElementFromElementTree(element.id))

        const api = this.typeService.addInterface({
          id: v4(),
          kind: ITypeKind.InterfaceType,
          name: InterfaceType.createName(`${element.name}`),
          owner,
        })

        // 2. create the component with predefined root element
        const createdComponent = yield* _await(
          this.componentService.create({
            api,
            childrenContainerElement: element,
            id: v4(),
            name,
            owner,
            rootElement: element,
          }),
        )

        // 3. create a new element as an instance of the component
        if (!prevSibling) {
          const createdElement = yield* _await(
            this.create({
              id: v4(),
              name,
              parentElement,
              renderType: {
                id: createdComponent.id,
                kind: IRenderTypeKind.Component,
              },
            }),
          )

          yield* _await(
            this.attachElementAsFirstChild({
              element: createdElement,
              parentElement,
            }),
          )

          return createdElement
        }

        return yield* _await(
          this.createElementAsNextSibling({
            id: v4(),
            name,
            parentElement,
            prevSibling,
            renderType: {
              id: createdComponent.id,
              kind: IRenderTypeKind.Component,
            },
          }),
        )
      },
    ),
  )

  @modelAction
  writeClonesCache(elementFragment: IElementDTO) {
    return [...this.clonedElements.values()]
      .filter((element) => element.sourceElement?.id === elementFragment.id)
      .map((element) =>
        Element.create({
          ...elementFragment,
          // keep the cloned element's id
          id: element.id,
          parentComponent: element.parentComponent?.current
            ? ({
                id: element.parentComponent.current.id,
              } as IElementDTO['parentComponent'])
            : undefined,
        }),
      )
  }

  @modelAction
  removeClones(elementId: string) {
    return [...this.clonedElements.entries()]
      .filter(([id, component]) => component.sourceElement?.id === elementId)
      .forEach(([id]) => this.clonedElements.delete(id))
  }
}
