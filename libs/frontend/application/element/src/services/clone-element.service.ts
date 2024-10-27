import type {
  IBuilderService,
  ICloneElementService,
  IComponentService,
  IRuntimeElementModel,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentCreateResults,
  IComponentModel,
  IElementModel,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import type {
  IComponentDto,
  IElementCreateDto,
  IElementDto,
  IPropDto,
  IRef,
} from '@codelab/shared/abstract/core'

import {
  isRuntimeElement,
  runtimeElementRef,
} from '@codelab/frontend/abstract/application'
import { componentRef } from '@codelab/frontend/abstract/domain'
import {
  useActionService,
  useStoreService,
} from '@codelab/frontend-application-store/services'
import { useFieldService } from '@codelab/frontend-application-type/services'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import { makeAutoIncrementedName } from '@codelab/frontend-domain-element/use-cases/incremented-name'
import { propRepository } from '@codelab/frontend-domain-prop/repositories'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import {
  IElementRenderTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { mapDeep } from '@codelab/shared/utils'
import { v4 } from 'uuid'

import { useElementService } from './element.service'

interface ICloneElementProps {
  builderService: IBuilderService
  componentService: IComponentService
}

export const useCloneElementService = ({
  builderService,
  componentService,
}: ICloneElementProps): ICloneElementService => {
  const { rendererService, runtimeElementService } = useApplicationStore()
  const { elementDomainService } = useDomainStore()
  const actionService = useActionService()
  const elementService = useElementService()
  const fieldService = useFieldService()
  const storeService = useStoreService()

  const cloneElement = async (
    targetElement: IElementModel,
    targetParent: IElementModel,
  ) => {
    const oldToNewIdMap = await recursiveDuplicate(
      targetElement,
      targetParent,
      true,
    )

    const createdElements = [...oldToNewIdMap.values()]
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
  }

  const convertElementToComponent = async (
    runtimeElement: IRuntimeElementModel,
  ) => {
    const element = runtimeElement.element.current
    const runtimeParentElement = runtimeElement.parentElement

    if (!element.closestParentElement) {
      throw new Error("Can't convert root element")
    }

    const {
      closestContainerNode,
      closestParentElement: parentElement,
      name,
      prevSibling,
    } = element

    builderService.setSelectedNode(null)

    const createdComponent = await componentService.create({
      id: v4(),
      name,
      rootElement: { id: element.id },
    })

    await cloneElementStore(
      element,
      createdComponent.store,
      createdComponent.store,
    )
    element.detachFromTree()
    // TODO: Refactor to non-optimistic
    // element.attachAsFirstChild(createdComponent.rootElement.current)
    element.setParentComponent(componentRef(createdComponent.id))

    await elementService.syncModifiedElements()

    const componentId = createdComponent.id

    const renderType = {
      __typename: IElementRenderTypeKind.Component,
      id: componentId,
    }

    const props: IPropDto = {
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

    const createdElement = await elementService.createElement({
      ...instanceElement,
      prevSibling,
    })

    const runtimeCreatedElement = runtimeParentElement?.children.find(
      (child): child is IRuntimeElementModel =>
        isRuntimeElement(child) && child.element.id === createdElement.id,
    )

    if (runtimeCreatedElement) {
      builderService.setSelectedNode(
        runtimeElementRef(runtimeCreatedElement.compositeKey),
      )
    }

    return createdElement
  }

  const cloneElementStore = async (
    element: IElementModel,
    componentStore: IRef,
    componentStoreApi: IRef,
  ) => {
    const elementStore = element.store.current

    await Promise.all(
      elementStore.api.current.fields.map((field) =>
        fieldService.cloneField(field, componentStoreApi.id),
      ),
    )

    const clonedActions = await Promise.all(
      elementStore.actions.map((action) =>
        actionService.cloneAction(action, componentStore.id),
      ),
    )

    const oldToNewActionIdMap = elementStore.actions.reduce(
      (acc, action, index) => {
        const clonedAction = clonedActions[index]

        if (clonedAction) {
          acc.set(action.id, clonedAction.id)
        }

        return acc
      },
      new Map<string, string>(),
    )

    const elementProps = [
      element.props,
      ...element.descendantElements.map(
        (descendantElement) => descendantElement.props,
      ),
    ]

    const updatedElementProps = elementProps.map((props) => {
      const updatedPropsData = mapDeep(props.data.data ?? {}, (value) => {
        if (
          value.kind === ITypeKind.ActionType &&
          oldToNewActionIdMap.has(value.value)
        ) {
          return { ...value, value: oldToNewActionIdMap.get(value.value) }
        }

        return value
      })

      return props.writeCache({ data: JSON.stringify(updatedPropsData) })
    })

    await Promise.all(
      updatedElementProps.map((props) =>
        propRepository.update({ id: props.id }, props.toJson),
      ),
    )

    await storeService.getOne(componentStore.id)
  }

  const recursiveDuplicate = async (
    element: IElementModel,
    parentElement: IElementModel,
    isRoot: boolean,
  ) => {
    const duplicateName = makeAutoIncrementedName(
      rendererService.activeElementTree?.elements.map(({ name }) => name) || [],
      element.name,
      true,
    )

    const propsDto: IPropDto = {
      data: element.props.jsonString,
      id: v4(),
    }

    const lastChild = parentElement.children[parentElement.children.length - 1]

    const cloneElementDto: IElementDto = {
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
      parentElement: !lastChild ? parentElement : undefined,
      prevSibling: isRoot ? element : lastChild,
      props: propsDto,
      renderForEachPropKey: element.renderForEachPropKey,
      renderIfExpression: element.renderIfExpression,
      renderType: element.renderType.current.toJson,
      style: element.style,
    }

    const elementCloneModel = elementDomainService.addTreeNode(cloneElementDto)

    await elementRepository.add(cloneElementDto)

    const children = await Promise.all(
      element.children.map((child) =>
        recursiveDuplicate(child, elementCloneModel, false),
      ),
    )

    const oldToNewIdMap: Map<string, IElementModel> = children.reduce(
      (acc, curElementModel) => new Map([...acc, ...curElementModel]),
      new Map([[element.id, elementCloneModel]]),
    )

    return oldToNewIdMap
  }

  return {
    cloneElement,
    convertElementToComponent,
  }
}
