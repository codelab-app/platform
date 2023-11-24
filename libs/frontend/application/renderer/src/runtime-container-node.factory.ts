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

    const runtimeStore = RuntimeStoreModel.create({
      id: runtimeStoreId,
      runtimeProviderStore: runtimeProviderStore
        ? runtimeStoreRef(runtimeProviderStore.id)
        : undefined,
      store: storeRef(containerNode.store.current),
    })

    const runtimeRootElementProps = RuntimeElementProps.create({
      element: elementRef(containerNode.rootElement.id),
      runtimeElement: runtimeElementRef(runtimeRootElementId),
    })

    const runtimeRootElement = RuntimeElement.create({
      element: elementRef(containerNode.rootElement.id),
      id: runtimeRootElementId,
      parent: runtimeContainerNodeRef(runtimeContainerNodeId),
      runtimeProps: runtimeRootElementProps,
    })

    const runtimeComponentProps = isComponent(containerNode)
      ? RuntimeComponentProps.create({
          component: componentRef(containerNode.id),
          runtimeContainerNode: runtimeContainerNodeRef(runtimeContainerNodeId),
        })
      : undefined

    const runtimeContainerNode = RuntimeContainerNodeModel.create({
      containerNode: isPage(containerNode)
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
