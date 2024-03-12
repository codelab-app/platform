import type {
  IRendererDto,
  IRendererModel,
  IRendererService,
} from '@codelab/frontend/abstract/application'
import {
  getRuntimeComponentService,
  getRuntimeElementService,
  isRuntimePage,
  isRuntimeStore,
} from '@codelab/frontend/abstract/application'
import type { IPageModel } from '@codelab/frontend/abstract/domain'
import { IStoreModel } from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
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
  get activeElementTree() {
    return this.activeRenderer?.current.containerNode.current
  }

  @computed
  get runtimeComponentService() {
    return getRuntimeComponentService(this)
  }

  @computed
  get runtimeElementService() {
    return getRuntimeElementService(this)
  }

  @modelAction
  hydrate = (rendererDto: IRendererDto) => {
    let renderer = this.renderers.get(rendererDto.id)

    if (!renderer) {
      renderer = Renderer.create(rendererDto)

      this.renderers.set(rendererDto.id, renderer)
    } else {
      // existing renderer may change type when switching between builder and preview modes
      renderer.rendererType = rendererDto.rendererType
      renderer.urlSegments = rendererDto.urlSegments

      // Reset the pre/post render actions for all elements when navigating.
      // The stopper is used to prevent infinite re-rendering when the action mutates a state
      // which causes re-rendering the root container node.

      this.runtimeElementService.elementsList.forEach((runtimeElement) => {
        runtimeElement.setPreRenderActionDone(false)
        runtimeElement.setPostRenderActionDone(false)
      })
    }

    return renderer
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

  /**
   * This is the entry point to start the rendering process
   */
  renderRoot(renderer: IRendererModel) {
    return renderer.render
  }

  runtimePage(page: IPageModel) {
    const rootNode = this.activeRenderer?.current.runtimeRootContainerNode

    return rootNode
      ? walkTree(
          rootNode,
          (child) =>
            isModel(child) && isRuntimePage(child) && page.id === child.page.id
              ? child
              : undefined,
          WalkTreeMode.ParentFirst,
        )
      : undefined
  }
}
