import type {
  IRuntimeModel,
  IRuntimeStoreModel,
} from '@codelab/frontend/abstract/application'
import {
  runtimeContainerNodeRef,
  runtimeElementRef,
  runtimeModelRef,
  runtimeStoreRef,
} from '@codelab/frontend/abstract/application'
import {
  actionRef,
  componentRef,
  elementRef,
  type IComponentModel,
  type IPageModel,
  isComponent,
  isPage,
  pageRef,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import { v4 } from 'uuid'
import { RuntimeActionModel } from './runtime-action.model'
import { RuntimeComponentProps } from './runtime-component-prop.model'
import { RuntimeContainerNodeModel } from './runtime-container-node.model'
import { RuntimeElement } from './runtime-element.model'
import { RuntimeElementProps } from './runtime-element-prop.model'
import { RuntimeStoreModel } from './runtime-store.model'

export class RuntimeContainerNodeFactory {
  static create({
    containerNode,
    parent,
    runtimeProviderStore,
  }: {
    containerNode: IComponentModel | IPageModel
    runtimeProviderStore?: IRuntimeStoreModel
    parent?: IRuntimeModel
  }) {
    const runtimeContainerNodeId = v4()
    const runtimeRootElementId = v4()
    const runtimeStoreId = v4()

    const runtimeActions = containerNode.store.current.actions.map((action) =>
      RuntimeActionModel.create({
        actionRef: actionRef(action.id),
        runtimeStoreRef: runtimeStoreRef(runtimeStoreId),
      }),
    )

    const runtimeStore = RuntimeStoreModel.create({
      id: runtimeStoreId,
      runtimeActions,
      runtimeProviderStoreRef: runtimeProviderStore
        ? runtimeStoreRef(runtimeProviderStore.id)
        : undefined,
      storeRef: storeRef(containerNode.store.current),
    })

    const runtimeRootElementProps = RuntimeElementProps.create({
      elementRef: elementRef(containerNode.rootElement.id),
      runtimeElementRef: runtimeElementRef(runtimeRootElementId),
    })

    const runtimeRootElement = RuntimeElement.create({
      elementRef: elementRef(containerNode.rootElement.id),
      id: runtimeRootElementId,
      parentRef: runtimeContainerNodeRef(runtimeContainerNodeId),
      runtimeProps: runtimeRootElementProps,
    })

    const runtimeComponentProps = isComponent(containerNode)
      ? RuntimeComponentProps.create({
          componentRef: componentRef(containerNode.id),
          runtimeContainerNodeRef: runtimeContainerNodeRef(
            runtimeContainerNodeId,
          ),
        })
      : undefined

    const runtimeContainerNode = RuntimeContainerNodeModel.create({
      containerNodeRef: isPage(containerNode)
        ? pageRef(containerNode.id)
        : componentRef(containerNode.id),
      id: runtimeContainerNodeId,
      parentRef: parent ? runtimeModelRef(parent) : undefined,
      runtimeProps: runtimeComponentProps,
      runtimeRootElement,
      runtimeStore,
    })

    return runtimeContainerNode
  }
}
