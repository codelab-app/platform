import {
  IComponentModel,
  IElementModel,
  ICreateElementData,
  IElementService,
  getElementService,
  getComponentService,
  IMoveFirstChildProps,
  IMoveNextSiblingProps,
  IMoveElementService,
} from '@codelab/frontend/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import {
  Model,
  _async,
  _await,
  model,
  modelAction,
  modelFlow,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { Component } from '@codelab/frontend/domain/component'
import { IEntity } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import uniq from 'lodash/uniq'
import { makeAutoIncrementedName } from '../../../utils'
import compact from 'lodash/compact'

@model('@codelab/MoveElementService')
export class MoveElementService
  extends Model({})
  implements IMoveElementService
{
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
  attachElementAsFirstChild(
    this: MoveElementService,
    {
      element: existingElement,
      parentElement: existingParentElement,
    }: IMoveFirstChildProps,
  ) {
    const element = this.elementService.element(existingElement.id)
    const parentElement = this.elementService.element(existingParentElement.id)
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
   * Element appends as next sibling to target
   *
   * (target)-(nextSibling)
   * (target)-[element]-(nextSibling)
   */
  @modelAction
  attachElementAsNextSibling(
    this: MoveElementService,
    {
      element: existingElement,
      targetElement: existingTargetElement,
    }: IMoveNextSiblingProps,
  ) {
    const element = this.elementService.element(existingElement.id)
    const targetElement = this.elementService.element(existingTargetElement.id)
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
  detachElementFromElementTree(this: MoveElementService, elementId: string) {
    const element = this.elementService.element(elementId)

    const affectedNodeIds = [
      element.prevSibling?.current.id,
      element.nextSibling?.current.id,
    ]

    if (element.parentElement?.current.firstChild?.id === element.id) {
      affectedNodeIds.push(element.parentElement.current.id)
    }

    element.detachFromParent()
    element.connectPrevToNextSibling()

    return compact(affectedNodeIds)
  }

  @modelFlow
  @transaction
  moveComponentToAnotherTree = _async(function* (
    this: MoveElementService,
    {
      component,
      dropPosition,
      targetElement,
    }: {
      dropPosition: number
      component: IComponentModel
      targetElement: IElementModel
    },
  ) {
    const elementTree = targetElement.closestContainerNode

    const existingInstances = elementTree.elements.filter(
      ({ renderType }) => renderType.id === component.id,
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
    const parentElement = { id: targetElement.id }

    const data: ICreateElementData = {
      closestContainerNode: {
        id: component.id,
      },
      id: v4(),
      name,
      parentElement,
      renderType: {
        __typename: IElementRenderTypeKind.Component,
        id: component.id,
      },
    }

    const element = yield* _await(this.elementService.create(data))
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
  moveElementAsFirstChild = _async(function* (
    this: MoveElementService,
    {
      element,
      parentElement,
    }: Parameters<IMoveElementService['moveElementAsFirstChild']>[0],
  ) {
    const oldConnectedNodeIds = this.detachElementFromElementTree(element.id)

    const newConnectedNodeIds = this.attachElementAsFirstChild({
      element,
      parentElement,
    })

    const affectedIds = [...newConnectedNodeIds, ...oldConnectedNodeIds]
    yield* _await(this.elementService.updateAffectedElements(affectedIds))
  })

  /**
   * Moves an element to the next position of target element
   */
  @modelFlow
  @transaction
  moveElementAsNextSibling = _async(function* (
    this: MoveElementService,
    {
      element,
      targetElement,
    }: Parameters<IMoveElementService['moveElementAsNextSibling']>[0],
  ) {
    const target = this.elementService.element(targetElement.id)

    if (target.nextSibling?.getRefId() === element.id) {
      return
    }

    const oldConnectedNodeIds = this.detachElementFromElementTree(element.id)

    const newConnectedNodeIds = this.attachElementAsNextSibling({
      element,
      targetElement,
    })

    const affectedIds = [...newConnectedNodeIds, ...oldConnectedNodeIds]
    yield* _await(this.elementService.updateAffectedElements(affectedIds))
  })

  @modelFlow
  @transaction
  moveNodeToAnotherTree = _async(function* (
    this: MoveElementService,
    {
      dropPosition,
      object: { id: objectId },
      targetElement: { id: targetElementId },
    }: Parameters<IMoveElementService['moveNodeToAnotherTree']>[0],
  ) {
    const targetElement = this.elementService.element(targetElementId)
    const element = this.elementService.maybeElement(objectId)
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

    yield* _await(this.elementService.updateAffectedElements(affectedNodeIds))
  })

  @modelAction
  moveElementToAnotherTree = ({
    dropPosition,
    element,
    targetElement,
  }: {
    dropPosition: number
    element: IElementModel
    targetElement: IElementModel
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

  @computed
  private get elementService() {
    return getElementService(this)
  }

  @computed
  private get componentService() {
    return getComponentService(this)
  }
}
