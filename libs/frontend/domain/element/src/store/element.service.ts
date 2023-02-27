import type {
  IAtom,
  IAuth0Owner,
  IComponent,
  ICreateElementData,
  IElement,
  IElementRef,
  IElementService,
  IInterfaceType,
  IUpdateElementData,
  RenderType,
} from '@codelab/frontend/abstract/core'
import {
  IElementDTO,
  isAtomDTO,
  isComponentDTO,
  RenderTypeEnum,
} from '@codelab/frontend/abstract/core'
import { getAtomService } from '@codelab/frontend/domain/atom'
import { getPropService } from '@codelab/frontend/domain/prop'
import { getTypeService } from '@codelab/frontend/domain/type'
import {
  componentRef,
  getBuilderService,
  getComponentService,
} from '@codelab/frontend/presenter/container'
import {
  createUniqueName,
  runSequentially,
} from '@codelab/frontend/shared/utils'
import type {
  ElementCreateInput,
  ElementUpdateInput,
  ElementWhere,
} from '@codelab/shared/abstract/codegen'
import { RenderedComponentFragment } from '@codelab/shared/abstract/codegen'
import type { IEntity, Maybe } from '@codelab/shared/abstract/types'
import { isNonNullable } from '@codelab/shared/utils'
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
import { isNil } from 'ramda'
import { v4 } from 'uuid'
import type { UpdateElementsMutationVariables } from '../graphql/element.endpoints.graphql.gen'
import { makeAutoIncrementedName } from '../utils'
import {
  makeCreateInput,
  makeDefaultProps,
  makeDuplicateInput,
  makeUpdateInput,
} from './api.utils'
import { elementApi } from './apis'
import { Element } from './element.model'
import { elementRef } from './element.ref'
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
    id: idProp,
    /**
     * Contains all elements
     *
     * - Elements part of rootTree
     * - Elements that are detached
     */
    elements: prop(() => objectMap<IElement>()),
    clonedElements: prop(() => objectMap<IElement>()),
    createModal: prop(() => new CreateElementModalService({})),
    updateModal: prop(() => new UpdateElementModalService({})),
    deleteModal: prop(() => new ElementModalService({})),
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
  public getAll = _async(function* (
    this: ElementService,
    where?: ElementWhere,
  ) {
    const { elements } = yield* _await(
      elementApi.GetElements({
        where,
      }),
    )

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

    return { rootElement, hydratedElements }
  }

  @modelAction
  add = (elementDTO: IElementDTO): IElement => {
    console.debug('ElementService.writeCache', elementDTO)

    const { parentComponent, renderComponentType, renderAtomType, props } =
      elementDTO

    if (renderAtomType) {
      this.atomService.add(renderAtomType)
    }

    if (parentComponent) {
      this.componentService.add(parentComponent)
    }

    if (renderComponentType) {
      this.componentService.add(renderComponentType)
    }

    if (props) {
      this.propService.add(props)
    }

    const element = Element.create(elementDTO)

    this.elements.set(element.id, element)

    this.writeClonesCache(elementDTO)

    return element
  }

  /**
   * We need a separate create function for element trees
   */
  @modelFlow
  @transaction
  public createSubmit = _async(function* (
    this: ElementService,
    data: Array<ICreateElementData>,
  ) {
    const input: Array<ElementCreateInput> = []

    for (const elementInput of data) {
      const parentElement = this.elements.get(
        elementInput.parentElement?.id ?? '',
      )

      const name = createUniqueName(elementInput.name, {
        id: parentElement?.baseId,
      })

      // When creating a new element, we need the interface type fields
      // and we use it to create a props with default values for the created element
      const typeApi = yield* _await(this.getElementInputTypeApi(elementInput))

      input.push(
        makeCreateInput({
          ...elementInput,
          name,
          propsData: makeDefaultProps(typeApi),
        }),
      )
    }

    const {
      createElements: { elements },
    } = yield* _await(elementApi.CreateElements({ input }))

    return elements.map((element) => this.add(element))
  })

  /**
   * Returns the associated interface type of the new element to be created.
   * To be used to check on the fields that has a default value
   * and make a default `dataProps` input for the creation of the element
   */
  @modelFlow
  private getElementInputTypeApi = _async(function* (
    this: ElementService,
    elementInput: ICreateElementData,
  ) {
    let baseElementType: Maybe<IAtom | IComponent>

    if (elementInput.renderType?.model === RenderTypeEnum.Component) {
      baseElementType = yield* _await(
        this.componentService.getOne(elementInput.renderType.id),
      )

      if (!baseElementType) {
        throw new Error(
          `Component with id ${elementInput.renderType.id} not found`,
        )
      }
    } else if (elementInput.renderType?.model === RenderTypeEnum.Atom) {
      baseElementType = yield* _await(
        this.atomService.getOne(elementInput.renderType.id),
      )

      if (!baseElementType) {
        throw new Error(`Atom with id ${elementInput.renderType.id} not found`)
      }
    }

    if (baseElementType) {
      const typeApi = yield* _await(
        this.typeService.getOne(baseElementType.api.id),
      )

      // Atoms and components have interface type
      return typeApi as Maybe<IInterfaceType>
    }

    return
  })

  /**
   * Used to load the entire page tree
   */
  @modelFlow
  private getDescendants = _async(function* (
    this: ElementService,
    rootId: IElementRef,
  ) {
    const { elementTrees } = yield* _await(
      elementApi.GetElementTree({ where: { id: rootId } }),
    )

    if (!elementTrees[0]) {
      return []
    }

    const elements: Array<IElementDTO> = [
      elementTrees[0],
      ...(elementTrees[0]?.descendantElements ?? []),
    ]

    return elements.map((element) => this.add(element))
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
  public update = _async(function* (
    this: ElementService,
    element: IElement,
    input: IUpdateElementData,
  ) {
    const name = createUniqueName(input.name, { id: element.baseId })

    const {
      atom: currentAtom,
      renderComponentType: currentRenderComponentType,
    } = element

    const { model: renderTypeModel, id: newRenderTypeId } =
      input.renderType ?? {}

    const isUpdatedWithAtom = renderTypeModel === RenderTypeEnum.Atom
    const isUpdatedWithComponent = renderTypeModel === RenderTypeEnum.Component

    const isCurrentlyEmptyElement =
      isNil(currentAtom) && isNil(currentRenderComponentType)

    const changedFromAtomToComponent =
      isUpdatedWithAtom && !isNil(currentRenderComponentType)

    const changedFromComponentToAtom =
      isUpdatedWithComponent && !isNil(currentAtom)

    const changedFromEmptyToAtomOrComponent =
      isCurrentlyEmptyElement && (isUpdatedWithAtom || isUpdatedWithComponent)

    const renderTypeChanged =
      changedFromAtomToComponent ||
      changedFromComponentToAtom ||
      changedFromEmptyToAtomOrComponent

    const renderIdChanged =
      (isUpdatedWithAtom && newRenderTypeId !== currentAtom?.id) ||
      (isUpdatedWithComponent &&
        newRenderTypeId !== currentRenderComponentType?.id)

    // we only want to change the props of the element if the user changes the atom or component
    let propsData: string | undefined

    if (renderTypeChanged || renderIdChanged) {
      // When replacing the atom or component of an element, we need the interface type fields of the new
      // atom/component and we use it to create a props with default values for the updated element
      const typeApi = yield* _await(this.getElementInputTypeApi(input))
      propsData = makeDefaultProps(typeApi)
    }

    const update = makeUpdateInput({
      ...input,
      name,
      propsData,
    })

    const {
      updateElements: { elements },
    } = yield* _await(
      elementApi.UpdateElements({
        where: { id: element.id },
        update,
      }),
    )

    return elements.map((_element: IElementDTO) => this.add(_element))
  })

  /**
   * Directly uses generated GraphQL operations
   */
  @modelFlow
  @transaction
  public patchElement = _async(function* (
    this: ElementService,
    entity: IEntity,
    input: ElementUpdateInput,
  ) {
    const {
      updateElements: { elements },
    } = yield* _await(
      elementApi.UpdateElements({
        where: { id: entity.id },
        update: input,
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
          elementId,
          targetElementId,
        }: Parameters<IElementService['moveElementAsNextSibling']>[0],
      ) {
        const targetElement = this.element(targetElementId)

        if (targetElement.nextSibling?.getRefId() === elementId) {
          return
        }

        yield* _await(this.detachElementFromElementTree(elementId))

        yield* _await(
          this.attachElementAsNextSibling({ elementId, targetElementId }),
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
          elementId,
          parentElementId,
        }: Parameters<IElementService['moveElementAsFirstChild']>[0],
      ) {
        const element = this.maybeElement(elementId)
        const parentElement = this.maybeElement(parentElementId)

        if (!element || !parentElement) {
          return
        }

        yield* _await(this.detachElementFromElementTree(elementId))

        yield* _await(
          this.attachElementAsFirstChild({ elementId, parentElementId }),
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

        const [element] = yield* _await(this.createSubmit([data]))

        if (!element) {
          throw new Error('Create element failed')
        }

        yield* _await(
          this.attachElementAsFirstChild({
            elementId: element.id,
            parentElementId: data.parentElement.id,
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
        const [element] = yield* _await(this.createSubmit([data]))

        if (!element) {
          throw new Error('Create element failed')
        }

        yield* _await(
          this.attachElementAsNextSibling({
            elementId: element.id,
            targetElementId: String(data.prevSiblingId),
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
      elementId,
      targetElementId,
    }: {
      elementId: string
      targetElementId: string
    },
  ) {
    const element = this.maybeElement(elementId)
    const targetElement = this.maybeElement(targetElementId)

    if (!element || !targetElement) {
      return
    }

    const updateElementInputs: Array<UpdateElementsMutationVariables> = []
    const updateElementCacheFns: Array<() => void> = []

    // Attach to parent
    if (targetElement.parentElement) {
      updateElementCacheFns.push(
        element.attachToParent(elementRef(targetElement.parentElement.id)),
      )
    }

    /**
     * [target]-nextSibiling
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
      elementId,
      parentElementId,
    }: {
      elementId: string
      parentElementId: string
    },
  ) {
    const element = this.maybeElement(elementId)
    const parentElement = this.maybeElement(parentElementId)

    if (!element || !parentElement) {
      return
    }

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
          elementId,
          targetElementId,
          dropPosition,
        }: Parameters<IElementService['moveElementToAnotherTree']>[0],
      ) {
        const targetElement = this.maybeElement(targetElementId)

        if (!targetElement) {
          return
        }

        let element = this.maybeElement(elementId)

        if (!element) {
          const elementTree = Element.getElementTree(targetElement)

          const existingInstances = elementTree?.elements.filter(
            ({ renderComponentType }) => renderComponentType?.id === elementId,
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
            model: RenderTypeEnum.Component,
          }

          const parentElementId = targetElement.id
          const data = { id: v4(), name, renderType, parentElementId }

          element = (yield* _await(this.createSubmit([data])))[0]
        } else {
          yield* _await(this.detachElementFromElementTree(element.id))
        }

        if (!element) {
          return
        }

        const insertAfterId = targetElement.children[dropPosition]?.id

        if (!insertAfterId || dropPosition === 0) {
          yield* _await(
            this.attachElementAsFirstChild({
              elementId: element.id,
              parentElementId: targetElement.id,
            }),
          )
        } else {
          yield* _await(
            this.attachElementAsNextSibling({
              elementId: element.id,
              targetElementId: insertAfterId,
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
  public deleteElementSubgraph = _async(
    runSequentially(
      'elementTransaction',
      function* (this: ElementService, root: IElementRef) {
        const { elementTrees } = yield* _await(
          elementApi.GetElementTree({ where: { id: root } }),
        )

        if (!elementTrees[0]) {
          return []
        }

        const idsToDelete: Array<string> = [
          elementTrees[0].id,
          ...elementTrees[0].descendantElements.map((element) => element.id),
        ]

        const rootElement = this.maybeElement(root)

        if (rootElement) {
          yield* _await(this.detachElementFromElementTree(rootElement.id))
        }

        for (const id of idsToDelete.reverse()) {
          this.elements.delete(id)
          this.removeClones(id)
        }

        const {
          deleteElements: { nodesDeleted },
        } = yield* _await(
          elementApi.DeleteElements({
            where: {
              id_IN: idsToDelete,
            },
            delete: {
              props: {},
            },
          }),
        )

        if (nodesDeleted === 0) {
          throw new Error('No elements deleted')
        }

        return idsToDelete
      },
    ),
  )

  @computed
  get elementNames() {
    return [...this.elements.values()].map((element) => element.name)
  }

  private async recursiveDuplicate(element: IElement, parent: IElement) {
    const duplicate_name = makeAutoIncrementedName(
      this.builderService.activeElementTree?.elements.map(
        (anElement) => anElement.name,
      ) || [],
      element.name,
      true,
    )

    const createInput: ElementCreateInput = makeDuplicateInput(
      element,
      duplicate_name,
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
    const lastChildId = parent.children[parent.children.length - 1]?.id

    if (!lastChildId) {
      await this.attachElementAsFirstChild({
        elementId: elementModel.id,
        parentElementId: parent.id,
      })
    } else {
      await this.attachElementAsNextSibling({
        elementId: elementModel.id,
        targetElementId: lastChildId,
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
        if (!element.parentElement) {
          throw new Error("Can't convert root element")
        }

        const name = element.label
        const parentElement = element.parentElement
        const prevSibling = element.prevSibling

        // 1. detach the element from the element tree
        yield* _await(this.detachElementFromElementTree(element.id))

        // 2. create the component with predefined root element
        const [createdComponent] = yield* _await(
          this.componentService.createSubmit([
            {
              id: v4(),
              owner,
              name,
              rootElement: element,
              childrenContainerElement: element,
            },
          ]),
        )

        if (!createdComponent) {
          throw new Error('Create component failed')
        }

        // 3. create a new element as an instance of the component
        if (!prevSibling) {
          const [createdElement] = yield* _await(
            this.createSubmit([
              {
                id: v4(),
                name,
                renderType: {
                  id: createdComponent.id,
                  model: RenderTypeEnum.Component,
                },
                parentElement,
              },
            ]),
          )

          if (!createdElement) {
            throw new Error('Create element failed')
          }

          yield* _await(
            this.attachElementAsFirstChild({
              elementId: createdElement.id,
              parentElementId: parentElement.id,
            }),
          )

          return createdElement
        }

        return yield* _await(
          this.createElementAsNextSibling({
            id: v4(),
            name,
            renderType: {
              id: createdComponent.id,
              model: RenderTypeEnum.Component,
            },
            parentElement,
            prevSiblingId: prevSibling.id,
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
