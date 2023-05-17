import type {
  IComponent,
  ICreateElementData,
  IElement,
  IElementService,
} from '@codelab/frontend/abstract/core'
import {
  elementRef,
  getBuilderService,
  getComponentService,
  isComponentInstance,
  IUpdateElementData,
} from '@codelab/frontend/abstract/core'
import { getAtomService } from '@codelab/frontend/domain/atom'
import { Component } from '@codelab/frontend/domain/component'
import { getPropService } from '@codelab/frontend/domain/prop'
import { getTypeService } from '@codelab/frontend/domain/type'
import {
  RenderedComponentFragment,
  RenderTypeKind,
} from '@codelab/shared/abstract/codegen'
import type {
  IAuth0Owner,
  IElementDTO,
  RenderType,
} from '@codelab/shared/abstract/core'
import { IRenderTypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
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
    let element = this.maybeElement(elementDTO.id)

    if (element) {
      element.writeCache(elementDTO)
    } else {
      element = Element.create(elementDTO)

      this.elements.set(element.id, element)
    }

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
      (yield* _await(
        getRenderTypeApi({
          atomService: this.atomService,
          componentService: this.componentService,
          renderType: data.renderType,
        }),
      ))

    if (renderTypeApi) {
      yield* _await(this.typeService.getOne(renderTypeApi.id))
    }

    const elementProps = this.propService.add({
      data: data.props?.data ?? makeDefaultProps(renderTypeApi?.current),
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
    const element = this.element(id)

    element.writeCache({ ...elementData })
    this.writeCloneCache({ id, ...elementData })

    yield* _await(this.elementRepository.update(element))

    return element
  })

  @modelAction
  private writeCloneCache({ id, ...elementData }: IUpdateElementData) {
    return [...this.clonedElements.values()]
      .filter((clonedElement) => clonedElement.sourceElement?.id === id)
      .map((clone) => clone.writeCache({ ...elementData }))
  }

  /**
   * Need to take care of reconnecting parent/sibling nodes
   */
  @modelFlow
  @transaction
  delete = _async(function* (this: ElementService, subRoot: IElement) {
    console.debug('deleteElementSubgraph', subRoot)

    const subRootElement = this.element(subRoot.id)
    const parentComponent = subRootElement.parentComponent?.current
    const childrenContainer = parentComponent?.childrenContainerElement.current

    // Check if the element is linked as a children container in parent component
    // and replace this link to component root before element is deleted
    if (parentComponent && childrenContainer?.id === subRootElement.id) {
      yield* _await(
        this.componentService.update({
          childrenContainerElement: {
            id: parentComponent.rootElement.current.id,
          },
          id: parentComponent.id,
          name: parentComponent.name,
        }),
      )
    }

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

    yield* _await(this.updateAffectedElements(affectedNodeIds))
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

    const affectedIds = [...newConnectedNodeIds, ...oldConnectedNodeIds]
    yield* _await(this.updateAffectedElements(affectedIds))
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

    const affectedIds = [...newConnectedNodeIds, ...oldConnectedNodeIds]
    yield* _await(this.updateAffectedElements(affectedIds))
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

    const parentElementClone = [...this.clonedElements.values()].find(
      ({ sourceElement }) => sourceElement?.id === data.parentElement?.id,
    )

    if (parentElementClone) {
      const parentComponentId = element.parentComponent?.current.id
      const { clonedComponents } = this.componentService

      const clonesList = [...clonedComponents.values()].filter(
        ({ sourceComponent }) => sourceComponent?.id === parentComponentId,
      )

      const cloneIndex = clonesList.length
      const elementClone = element.clone(cloneIndex)

      this.attachElementAsFirstChild({
        element: elementClone,
        parentElement: parentElementClone,
      })
    }

    yield* _await(this.updateAffectedElements(affectedNodeIds))

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

    yield* _await(this.updateAffectedElements(affectedNodeIds))

    return element
  })

  @modelAction
  moveElementToAnotherTree = ({
    dropPosition,
    element,
    targetElement,
  }: {
    dropPosition: number
    element: IElement
    targetElement: IElement
  }) => {
    const oldConnectedNodeIds = this.detachElementFromElementTree(element.id)
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

    const affectedNodeIds = [...oldConnectedNodeIds, ...newConnectedNodeIds]

    return affectedNodeIds
  }

  @modelFlow
  @transaction
  moveComponentToAnotherTree = _async(function* (
    this: ElementService,
    {
      component,
      dropPosition,
      targetElement,
    }: {
      dropPosition: number
      component: IComponent
      targetElement: IElement
    },
  ) {
    const elementTree = targetElement.closestContainerNode

    const existingInstances = elementTree.elements.filter(
      ({ renderType }) => renderType?.id === component.id,
    )

    /**
     * Check if there is circular referance
     */
    const componentDescendants = component.descendantComponents

    if (
      elementTree instanceof Component &&
      componentDescendants.includes(elementTree)
    ) {
      throw new Error(
        `Cannot move ${component.name} into ${targetElement.name} because of a circular reference between ${component.name} and ${elementTree.name}
        `,
      )
    }

    /**
     * Create a new element as an instance of the component
     */
    const componentInstanceCounter = existingInstances.length
      ? ` ${existingInstances.length}`
      : ''

    const name = `${component.name}${componentInstanceCounter}`

    const renderType: RenderType = {
      id: component.id,
      kind: IRenderTypeKind.Component,
    }

    const parentElementId = targetElement.id
    const data = { id: v4(), name, parentElementId, renderType }
    const element = yield* _await(this.create(data))
    /**
     * Attach the new element to the target position
     */
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

    return newConnectedNodeIds
  })

  @modelFlow
  @transaction
  moveNodeToAnotherTree = _async(function* (
    this: ElementService,
    {
      dropPosition,
      object: { id: objectId },
      targetElement: { id: targetElementId },
    }: Parameters<IElementService['moveNodeToAnotherTree']>[0],
  ) {
    const targetElement = this.element(targetElementId)
    const element = this.maybeElement(objectId)
    const affectedNodeIds: Array<string> = []

    if (!element) {
      const component = this.componentService.components.get(objectId)

      if (!component) {
        throw new Error('Missing component')
      }

      affectedNodeIds.push(
        ...(yield* _await(
          this.moveComponentToAnotherTree({
            component,
            dropPosition,
            targetElement,
          }),
        )),
      )
    } else {
      affectedNodeIds.push(
        ...this.moveElementToAnotherTree({
          dropPosition,
          element,
          targetElement,
        }),
      )
    }

    yield* _await(this.updateAffectedElements(affectedNodeIds))
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

    const cloneElementDto = {
      customCss: element.customCss,
      guiCss: element.guiCss,
      id: v4(),
      name: duplicateName,
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
    }

    const elementCloneModel = this.add(cloneElementDto)

    await this.elementRepository.add(elementCloneModel)

    const lastChild = parentElement.children[parentElement.children.length - 1]
    let affectedNodeIds: Array<string> = []

    if (!lastChild) {
      affectedNodeIds = this.attachElementAsFirstChild({
        element: elementCloneModel,
        parentElement,
      })
    } else {
      affectedNodeIds = this.attachElementAsNextSibling({
        element: elementCloneModel,
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
        this.recursiveDuplicate(child, elementCloneModel),
      ),
    )

    const oldToNewIdMap: Map<string, IElement> = children.reduce(
      (acc, curElementModel) => new Map([...acc, ...curElementModel]),
      new Map([[element.id, elementCloneModel]]),
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
    if (!element.closestParent) {
      throw new Error("Can't convert root element")
    }

    const { closestParent: parentElement, name, prevSibling } = element

    // 1. deselect active element to avoid script errors if the selected element
    // is a child of the element we are converting or the element itself
    this.builderService.setSelectedNode(null)

    // 2. create the component first before detaching the element from the element tree,
    // this way in case if component creation fails, we avoid data loss
    const createdComponent = yield* _await(
      this.componentService.create({ id: v4(), name, owner }),
    )

    // 3. detach the element from the element tree
    const oldConnectedNodeIds = this.detachElementFromElementTree(element.id)
    yield* _await(this.updateAffectedElements(oldConnectedNodeIds))

    // 4. attach current element to the component
    const affectedAttachedNodes = this.attachElementAsFirstChild({
      element,
      parentElement: createdComponent.rootElement,
    })

    yield* _await(this.updateAffectedElements(affectedAttachedNodes))

    // 5. create a new element as an instance of the component
    const componentId = createdComponent.id
    const renderType = { id: componentId, kind: IRenderTypeKind.Component }
    const instanceElement = { id: v4(), name, parentElement, renderType }

    const createdElement = yield* _await(
      prevSibling
        ? this.createElementAsNextSibling({
            ...instanceElement,
            prevSibling,
          })
        : this.createElementAsFirstChild(instanceElement),
    )

    // 6. set newly created element as selected element in builder tree
    this.builderService.setSelectedNode(elementRef(createdElement))

    return createdElement
  })

  @modelFlow
  @transaction
  updateAffectedElements = _async(function* (
    this: ElementService,
    elementIds: Array<string>,
  ) {
    yield* _await(
      Promise.all(
        uniq(elementIds).map((id) =>
          this.elementRepository.updateNodes(this.element(id)),
        ),
      ),
    )
  })

  @modelAction
  removeClones(elementId: string) {
    return [...this.clonedElements.entries()]
      .filter(([id, component]) => component.sourceElement?.id === elementId)
      .forEach(([id]) => {
        this.detachElementFromElementTree(id)
        this.clonedElements.delete(id)
      })
  }
}
