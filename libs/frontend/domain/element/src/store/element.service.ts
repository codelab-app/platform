import type {
  IAuth0Owner,
  ICreateElementData,
  IElement,
  IElementDTO,
  IElementService,
  IUpdateElementData,
  RenderType,
} from '@codelab/frontend/abstract/core'
import {
  getBuilderService,
  getComponentService,
  IRenderTypeKind,
  isComponentInstance,
} from '@codelab/frontend/abstract/core'
import { getAtomService } from '@codelab/frontend/domain/atom'
import { getPropService } from '@codelab/frontend/domain/prop'
import { getTypeService, InterfaceType } from '@codelab/frontend/domain/type'
import {
  RenderedComponentFragment,
  RenderTypeKind,
} from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { createUniqueName } from '@codelab/shared/utils'
import compact from 'lodash/compact'
import uniq from 'lodash/uniq'
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
import { ElementRepository } from '../services/element.repo'
import { makeAutoIncrementedName } from '../utils'
import { getRenderTypeApi, makeDefaultProps } from './api.utils'
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

  @modelAction
  add = (elementDTO: IElementDTO): IElement => {
    const element = Element.create(elementDTO)

    this.elements.set(element.id, element)

    return element
  }

  /**
   * We need a separate create function for element trees
   */
  @modelFlow
  @transaction
  create = _async(function* (this: ElementService, data: ICreateElementData) {
    const renderTypeApi =
      data.renderType &&
      getRenderTypeApi({
        atomService: this.atomService,
        componentService: this.componentService,
        renderType: data.renderType,
      })

    const elementProps = this.propService.add({
      data: makeDefaultProps(renderTypeApi?.current),
      id: v4(),
    })

    const element = this.add({
      ...data,
      props: elementProps,
    })

    yield* _await(this.elementRepository.add(element))

    return element
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: ElementService,
    { id, ...elementData }: IUpdateElementData,
  ) {
    const element = this.elements.get(id)!

    element.writeCache({
      ...elementData,
    })

    yield* _await(this.elementRepository.update(element))

    return element
  })

  /**
   * Need to take care of reconnecting parent/sibling nodes
   */
  @modelFlow
  @transaction
  delete = _async(function* (this: ElementService, subRoot: IEntity) {
    console.debug('deleteElementSubgraph', subRoot)

    const subRootElement = this.element(subRoot.id)
    const affectedNodeIds = this.detachElementFromElementTree(subRootElement.id)

    const allElementsToDelete = [
      subRootElement,
      ...subRootElement.descendantElements,
    ]

    this.elements.delete(subRootElement.id)
    allElementsToDelete.reverse().forEach((element) => {
      this.removeClones(element.id)
      this.elements.delete(element.id)
    })

    yield* _await(
      Promise.all(
        affectedNodeIds.map((id) =>
          this.elementRepository.updateNodes(this.element(id)),
        ),
      ),
    )

    yield* _await(this.elementRepository.delete(allElementsToDelete))

    return
  })

  @modelAction
  element(id: string) {
    const element = this.maybeElement(id)

    if (!element) {
      throw new Error('Missing element')
    }

    return element
  }

  @modelAction
  maybeElement(id: string) {
    return this.elements.get(id) || this.clonedElements.get(id)
  }

  @modelAction
  loadComponentTree(component: RenderedComponentFragment) {
    const elements = [
      component.rootElement,
      ...component.rootElement.descendantElements,
    ]

    const hydratedElements = elements.map((element) => this.add(element))
    const rootElement = this.element(component.rootElement.id)

    return { hydratedElements, rootElement }
  }

  /**
   * Detaches element from an element tree. Will perform 3 conditional checks to see which specific detach to call
   *
   * There are 2 scenarios
   *
   * When element is firstChild, we'll need to re-add a first child
   *
   * (parent)
   * \
   * [element]-(sibling)
   *
   * When element is a sibling, we'll reconnect siblings
   *
   * (parent)
   * \
   * (firstChild)-[element]-(sibling)
   *
   * - Detach from parent
   * - Detach from next sibling
   * - Detach from prev sibling
   * - Connect prev to next
   */
  @modelAction
  private detachElementFromElementTree(
    this: ElementService,
    elementId: string,
  ) {
    const element = this.element(elementId)

    const affectedNodeIds = [
      element.prevSibling?.current.id,
      element.nextSibling?.current.id,
    ]

    if (element.parent?.current.firstChild?.id === element.id) {
      affectedNodeIds.push(element.parent.current.id)
    }

    element.detachFromParent()
    element.connectPrevToNextSibling()

    return compact(affectedNodeIds)
  }

  /**
   * Element appends as next sibling to target
   *
   * (target)-(nextSibling)
   * (target)-[element]-(nextSibling)
   */
  @modelAction
  private attachElementAsNextSibling(
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
    const affectedNodeIds: Array<string> = []

    if (targetElement.nextSibling) {
      element.attachAsPrevSibling(targetElement.nextSibling.current)
      affectedNodeIds.push(targetElement.nextSibling.current.id)
    }

    element.attachAsNextSibling(targetElement)
    affectedNodeIds.push(targetElement.id)
    affectedNodeIds.push(element.id)

    return affectedNodeIds
  }

  /**
   * Moves an element as a first child to a parent. Bumps the existing firstChild as nextSibling
   *
   * (parent)
   * \
   * (firstChild)
   *
   * (parent)
   * \
   * [element]-(firstChild)
   */
  @modelAction
  private attachElementAsFirstChild(
    this: ElementService,
    {
      element: existingElement,
      parentElement: existingParentElement,
    }: {
      element: IEntity
      parentElement: IEntity
    },
  ) {
    const element = this.element(existingElement.id)
    const parentElement = this.element(existingParentElement.id)
    const affectedNodeIds: Array<string> = []

    /**
     * If parent already has a firstChild, we'll need to attach the new element as the previous sibling
     */
    if (parentElement.firstChild) {
      element.attachAsPrevSibling(parentElement.firstChild.current)
      affectedNodeIds.push(parentElement.firstChild.current.id)
    }

    // attach to parent
    element.attachToParentAsFirstChild(parentElement)
    affectedNodeIds.push(parentElement.id)
    affectedNodeIds.push(element.id)

    return affectedNodeIds
  }

  /**
   * Moves an element to the next position of target element
   */
  @modelFlow
  @transaction
  moveElementAsNextSibling = _async(function* (
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

    const oldConnectedNodeIds = this.detachElementFromElementTree(element.id)

    const newConnectedNodeIds = this.attachElementAsNextSibling({
      element,
      targetElement,
    })

    yield* _await(
      Promise.all(
        uniq([...newConnectedNodeIds, ...oldConnectedNodeIds]).map((id) =>
          this.elementRepository.updateNodes(this.element(id)),
        ),
      ),
    )
  })

  @modelFlow
  @transaction
  moveElementAsFirstChild = _async(function* (
    this: ElementService,
    {
      element,
      parentElement,
    }: Parameters<IElementService['moveElementAsFirstChild']>[0],
  ) {
    const oldConnectedNodeIds = this.detachElementFromElementTree(element.id)

    const newConnectedNodeIds = this.attachElementAsFirstChild({
      element,
      parentElement,
    })

    yield* _await(
      Promise.all(
        uniq([...newConnectedNodeIds, ...oldConnectedNodeIds]).map((id) =>
          this.elementRepository.updateNodes(this.element(id)),
        ),
      ),
    )
  })

  @modelFlow
  @transaction
  createElementAsFirstChild = _async(function* (
    this: ElementService,
    data: ICreateElementData,
  ) {
    console.debug('createElementAsFirstChild', data)

    if (!data.parentElement?.id) {
      throw new Error("Parent element id doesn't exist")
    }

    const element = yield* _await(this.create(data))

    if (!element) {
      throw new Error('Create element failed')
    }

    const affectedNodeIds = this.attachElementAsFirstChild({
      element,
      parentElement: data.parentElement,
    })

    yield* _await(
      Promise.all(
        affectedNodeIds.map((id) =>
          this.elementRepository.updateNodes(this.element(id)),
        ),
      ),
    )

    return element
  })

  @modelFlow
  @transaction
  createElementAsNextSibling = _async(function* (
    this: ElementService,
    data: ICreateElementData,
  ) {
    const element = yield* _await(this.create(data))

    if (!data.prevSibling) {
      throw new Error('Missing previous sibling')
    }

    const prevSibling = this.element(data.prevSibling.id)

    const affectedNodeIds = this.attachElementAsNextSibling({
      element,
      targetElement: prevSibling,
    })

    yield* _await(
      Promise.all(
        affectedNodeIds.map((id) =>
          this.elementRepository.updateNodes(this.element(id)),
        ),
      ),
    )

    return element
  })

  @modelFlow
  @transaction
  moveElementToAnotherTree = _async(function* (
    this: ElementService,
    {
      dropPosition,
      element: { id: elementId },
      targetElement: { id: targetElementId },
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
      const oldConnectedNodeIds = this.detachElementFromElementTree(element.id)

      yield* _await(
        Promise.all(
          oldConnectedNodeIds.map((id) =>
            this.elementRepository.updateNodes(this.element(id)),
          ),
        ),
      )
    }

    const insertAfterId = targetElement.children[dropPosition]?.id
    let newConnectedNodeIds: Array<string> = []

    if (!insertAfterId || dropPosition === 0) {
      newConnectedNodeIds = this.attachElementAsFirstChild({
        element,
        parentElement: targetElement,
      })
    } else {
      newConnectedNodeIds = this.attachElementAsNextSibling({
        element,
        targetElement: { id: insertAfterId },
      })
    }

    yield* _await(
      Promise.all(
        newConnectedNodeIds.map((id) =>
          this.elementRepository.updateNodes(this.element(id)),
        ),
      ),
    )

    Element.getElementTree(element)?.removeElements([
      element,
      ...element.descendantElements,
    ])

    Element.getElementTree(targetElement)?.addElements([
      element,
      ...element.descendantElements,
    ])
  })

  private async recursiveDuplicate(element: IElement, parentElement: IElement) {
    const duplicateName = makeAutoIncrementedName(
      this.builderService.activeElementTree?.elements.map(({ name }) => name) ||
        [],
      element.name,
      true,
    )

    const props = this.propService.add({
      data: element.props.current.jsonString,
      id: v4(),
    })

    const elementClone = this.add({
      customCss: element.customCss,
      guiCss: element.guiCss,
      id: v4(),
      name: createUniqueName(duplicateName, element.baseId),
      props,
      propTransformationJs: element.propTransformationJs,
      renderForEachPropKey: element.renderForEachPropKey,
      renderIfExpression: element.renderIfExpression,
      renderType: element.renderType
        ? {
            id: element.renderType.id,
            kind: isComponentInstance(element.renderType)
              ? RenderTypeKind.Component
              : RenderTypeKind.Atom,
          }
        : null,
    })

    const createdElement = await this.elementRepository.add(elementClone)
    const elementModel = this.add(createdElement)
    const lastChild = parentElement.children[parentElement.children.length - 1]
    let affectedNodeIds: Array<string> = []

    if (!lastChild) {
      affectedNodeIds = this.attachElementAsFirstChild({
        element: elementModel,
        parentElement,
      })
    } else {
      affectedNodeIds = this.attachElementAsNextSibling({
        element: elementModel,
        targetElement: lastChild,
      })
    }

    await Promise.all(
      affectedNodeIds.map((id) =>
        this.elementRepository.updateNodes(this.element(id)),
      ),
    )

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
  cloneElement = _async(function* (
    this: ElementService,
    targetElement: IElement,
    targetParent: IElement,
  ) {
    const oldToNewIdMap = yield* _await(
      this.recursiveDuplicate(targetElement, targetParent),
    )

    const createdElements = [...oldToNewIdMap.values()]
    // re-attach the prop map bindings now that we have the new ids
    const allInputs = [targetElement, ...targetElement.descendantElements]

    for (const inputElement of allInputs) {
      const newId = oldToNewIdMap.get(inputElement.id)?.id

      if (!newId) {
        throw new Error(`Could not find new id for ${inputElement.id}`)
      }

      const duplicated = createdElements.find((element) => element.id === newId)

      if (!duplicated) {
        throw new Error(`Could not find duplicated element ${newId}`)
      }
    }

    return createdElements
  })

  @modelFlow
  @transaction
  convertElementToComponent = _async(function* (
    this: ElementService,
    element: IElement,
    owner: IAuth0Owner,
  ) {
    if (!element.parent) {
      throw new Error("Can't convert root element")
    }

    const { label, name, parent: parentElement, prevSibling } = element
    // 1. detach the element from the element tree
    const oldConnectedNodeIds = this.detachElementFromElementTree(element.id)

    yield* _await(
      Promise.all(
        oldConnectedNodeIds.map((id) =>
          this.elementRepository.updateNodes(this.element(id)),
        ),
      ),
    )

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

      const newConnectedNodeIds = this.attachElementAsFirstChild({
        element: createdElement,
        parentElement,
      })

      yield* _await(
        Promise.all(
          newConnectedNodeIds.map((id) =>
            this.elementRepository.updateNodes(this.element(id)),
          ),
        ),
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
  })

  @modelAction
  removeClones(elementId: string) {
    return [...this.clonedElements.entries()]
      .filter(([id, component]) => component.sourceElement?.id === elementId)
      .forEach(([id]) => this.clonedElements.delete(id))
  }
}
