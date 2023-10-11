import type {
  ICloneElementService,
  IComponentModel,
  IElementModel,
} from '@codelab/frontend/abstract/domain'
import {
  elementRef,
  getBuilderService,
  getComponentService,
  getElementService,
} from '@codelab/frontend/abstract/domain'
import { getPropService } from '@codelab/frontend/domain/prop'
import {
  getActionService,
  getStoreService,
} from '@codelab/frontend/domain/store'
import { getFieldService } from '@codelab/frontend/domain/type'
import type {
  IElementDTO,
  IPropData,
  IPropDTO,
} from '@codelab/shared/abstract/core'
import {
  IElementRenderTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { mapDeep } from '@codelab/shared/utils'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { makeAutoIncrementedName } from '../use-cases'

@model('@codelab/CloneElementService')
export class CloneElementService
  extends Model({})
  implements ICloneElementService
{
  @modelFlow
  @transaction
  cloneElement = _async(function* (
    this: CloneElementService,
    targetElement: IElementModel,
    targetParent: IElementModel,
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
    this: CloneElementService,
    element: IElementModel,
  ) {
    if (!element.closestParentElement) {
      throw new Error("Can't convert root element")
    }

    const {
      closestContainerNode,
      closestParentElement: parentElement,
      name,
      prevSibling,
    } = element

    // 1. deselect active element to avoid script errors if the selected element
    // is a child of the element we are converting or the element itself
    this.builderService.setSelectedNode(null)

    element.detachFromTree()

    // 3. create the component and pass element as rootElement for component,
    const createdComponent: IComponentModel = yield* _await(
      this.componentService.create({
        id: v4(),
        name,
        rootElement: { id: element.id },
      }),
    )

    yield* _await(this.cloneElementStore(element, createdComponent))
    yield* _await(this.elementService.syncModifiedElements())

    // 5. create a new element as an instance of the component
    const componentId = createdComponent.id

    const renderType = {
      __typename: IElementRenderTypeKind.Component,
      id: componentId,
    }

    const props: IPropDTO = {
      data: '{}',
      id: v4(),
    }

    const instanceElement = {
      closestContainerNode,
      id: v4(),
      name,
      parentElement,
      props,
      renderType,
    }

    const createdElement = yield* _await(
      this.elementService.createElement({
        ...instanceElement,
        prevSibling,
      }),
    )

    // 6. set newly created element as selected element in builder tree
    this.builderService.setSelectedNode(elementRef(createdElement))

    return createdElement
  })

  /**
   * Creates a clone of the actions and state fields of the element
   * in the component's store and updates the element props to use
   * the actions in the component store.
   * @param element - The element to clone the actions and state fields from
   * @param component - The component to clone the actions and state fields to
   */
  private async cloneElementStore(
    element: IElementModel,
    component: IComponentModel,
  ) {
    const elementStore = element.store.current
    const componentStore = component.store.current
    const componentStoreId = componentStore.api.current.id

    // Duplicate state fields into the component store api
    await Promise.all(
      elementStore.api.current.fields.map((field) =>
        this.fieldService.cloneField(field, componentStoreId),
      ),
    )

    // Duplicate actions into the component store
    const clonedActions = await Promise.all(
      elementStore.actions.map((action) =>
        this.actionService.cloneAction(action.current, componentStore.id),
      ),
    )

    const oldToNewActionIdMap = elementStore.actions.reduce(
      (acc, action, index) => {
        if (clonedActions[index]) {
          acc.set(action.id, clonedActions[index]!.id)
        }

        return acc
      },
      new Map<string, string>(),
    )

    // Update element and its descendants props values to use new action ids
    const elementAndDescendantsProps = [
      element.props.current,
      ...element.descendantElements.map(
        (descendantElement) => descendantElement.props.current,
      ),
    ]

    const updatedPropsById = elementAndDescendantsProps.reduce(
      (acc, elementProps) => {
        const updatedPropsData = mapDeep(elementProps.data, (value) => {
          if (
            value.kind === ITypeKind.ActionType &&
            oldToNewActionIdMap.has(value.value)
          ) {
            return { ...value, value: oldToNewActionIdMap.get(value.value) }
          }

          return value
        })

        acc.set(elementProps.id, updatedPropsData)

        return acc
      },
      new Map<string, IPropData>(),
    )

    await Promise.all(
      Array.from(updatedPropsById.entries()).map(([propId, updatedData]) => {
        return this.propService.update({
          data: JSON.stringify(updatedData.data),
          id: propId,
        })
      }),
    )

    // This is required to load the added actions and fields into the component store
    // otherwise the actions won't be available until the page is refreshed
    await this.storeService.getOne(componentStore.id)
  }

  private async recursiveDuplicate(
    element: IElementModel,
    parentElement: IElementModel,
  ) {
    const duplicateName = makeAutoIncrementedName(
      this.builderService.activeElementTree?.elements.map(({ name }) => name) ||
        [],
      element.name,
      true,
    )

    const propsDto: IPropDTO = {
      data: element.props.current.jsonString,
      id: v4(),
    }

    this.propService.add(propsDto)

    const cloneElementDto: IElementDTO = {
      childMapperComponent: element.childMapperComponent
        ? { id: element.childMapperComponent.id }
        : null,
      childMapperPreviousSibling: element.childMapperPreviousSibling
        ? { id: element.childMapperPreviousSibling.id }
        : null,
      childMapperPropKey: element.childMapperPropKey,
      closestContainerNode: element.closestContainerNode,
      id: v4(),
      name: duplicateName,
      page: element.page ? { id: element.page.id } : null,
      parentComponent: element.parentComponent
        ? { id: element.parentComponent.id }
        : null,
      props: propsDto,
      renderForEachPropKey: element.renderForEachPropKey,
      renderIfExpression: element.renderIfExpression,
      renderType: element.renderType.current.toJson,
      style: element.style,
    }

    const elementCloneModel =
      this.elementService.elementDomainService.hydrate(cloneElementDto)

    await this.elementService.elementRepository.add(elementCloneModel)

    const lastChild = parentElement.children[parentElement.children.length - 1]
    const affectedNodeIds: Array<string> = []

    // if (!lastChild) {
    //   affectedNodeIds =
    //     this.elementService..attachElementAsFirstChild({
    //       element: elementCloneModel,
    //       parentElement,
    //     })
    // } else {
    //   affectedNodeIds =
    //     this.elementService.moveElementService.attachElementAsNextSibling({
    //       element: elementCloneModel,
    //       targetElement: lastChild,
    //     })
    // }

    await Promise.all(
      affectedNodeIds.map((id) =>
        this.elementService.elementRepository.updateNodes(
          this.elementService.element(id),
        ),
      ),
    )

    const children = await Promise.all(
      element.children.map((child) =>
        this.recursiveDuplicate(child, elementCloneModel),
      ),
    )

    const oldToNewIdMap: Map<string, IElementModel> = children.reduce(
      (acc, curElementModel) => new Map([...acc, ...curElementModel]),
      new Map([[element.id, elementCloneModel]]),
    )

    return oldToNewIdMap
  }

  @computed
  private get actionService() {
    return getActionService(this)
  }

  @computed
  private get builderService() {
    return getBuilderService(this)
  }

  @computed
  private get componentService() {
    return getComponentService(this)
  }

  @computed
  private get elementService() {
    return getElementService(this)
  }

  @computed
  private get fieldService() {
    return getFieldService(this)
  }

  @computed
  private get propService() {
    return getPropService(this)
  }

  @computed
  private get storeService() {
    return getStoreService(this)
  }
}
