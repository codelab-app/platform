import type {
  IRendererDto,
  IRendererService,
} from '@codelab/frontend/abstract/application'
import {
  IRendererModel,
  isRuntimeContainerNode,
  isRuntimeElement,
  isRuntimeStore,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import { IElementModel, IStoreModel } from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import {
  isModel,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
  walkTree,
  WalkTreeMode,
} from 'mobx-keystone'
import { Renderer } from './renderer.model'

@model('@codelab/RendererApplicationService')
export class RendererApplicationService
  extends Model({
    activeRenderer: prop<Nullable<Ref<IRendererModel>>>(
      () => null,
    ).withSetter(),
    /**
     * These are renderers for the public, they are keyed by pageId
     */
    renderers: prop(() => objectMap<IRendererModel>()),
  })
  implements IRendererService
{
  @modelAction
  hydrate = (rendererDto: IRendererDto) => {
    let renderer = this.renderers.get(rendererDto.id)

    if (!renderer) {
      renderer = Renderer.create(rendererDto)

      this.renderers.set(rendererDto.id, renderer)
    }

    return renderer
  }

  /**
   * This is the entry point to start the rendering process
   */
  @modelAction
  renderRoot(renderer: IRendererModel) {
    return renderer.render()
  }

  @modelAction
  runtimeElement(element: IElementModel) {
    const rootNode = this.activeRenderer?.current.runtimeRootContainerNode

    return rootNode
      ? walkTree(
          rootNode,
          (child) =>
            isModel(child) &&
            isRuntimeElement(child) &&
            element.id === child.element.id
              ? child
              : undefined,
          WalkTreeMode.ParentFirst,
        )
      : undefined
  }

  @modelAction
  runtimeContainerNode(containerNode: IComponentModel | IPageModel) {
    const rootNode = this.activeRenderer?.current.runtimeRootContainerNode

    return rootNode
      ? walkTree(
          rootNode,
          (child) =>
            isModel(child) &&
            isRuntimeContainerNode(child) &&
            containerNode.id === child.containerNode.id
              ? child
              : undefined,
          WalkTreeMode.ParentFirst,
        )
      : undefined
  }

  @modelAction
  runtimeStore(store: IStoreModel) {
    const rootNode = this.activeRenderer?.current.runtimeRootContainerNode

    return rootNode
      ? walkTree(
          rootNode,
          (child) =>
            isModel(child) &&
            isRuntimeStore(child) &&
            store.id === child.store.id
              ? child
              : undefined,
          WalkTreeMode.ParentFirst,
        )
      : undefined
  }
}
