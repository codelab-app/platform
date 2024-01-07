import type {
  IRuntimeModel,
  IRuntimeStoreModel,
} from '@codelab/frontend/abstract/application'
import {
  runtimeContainerNodeRef,
  runtimeModelRef,
  runtimeStoreRef,
} from '@codelab/frontend/abstract/application'
import {
  componentRef,
  elementRef,
  type IComponentModel,
  type IPageModel,
  isPage,
  pageRef,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import { v4 } from 'uuid'
import { RuntimeContainerNodeModel } from './runtime-container-node.model'
import { RuntimeElement } from './runtime-element.model'
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

    const runtimeStore = RuntimeStoreModel.create({
      id: runtimeStoreId,
      runtimeProviderStore: runtimeProviderStore
        ? runtimeStoreRef(runtimeProviderStore.id)
        : undefined,
      store: storeRef(containerNode.store.current),
    })

    const runtimeRootElement = RuntimeElement.create({
      element: elementRef(containerNode.rootElement.id),
      id: runtimeRootElementId,
      parent: runtimeContainerNodeRef(runtimeContainerNodeId),
    })

    const runtimeContainerNode = RuntimeContainerNodeModel.create({
      containerNode: isPage(containerNode)
        ? pageRef(containerNode.id)
        : componentRef(containerNode.id),
      id: runtimeContainerNodeId,
      parentRef: parent ? runtimeModelRef(parent) : undefined,
      runtimeRootElement,
      runtimeStore,
    })

    return runtimeContainerNode
  }
}
