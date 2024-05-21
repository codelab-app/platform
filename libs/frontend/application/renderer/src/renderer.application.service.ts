import type {
  IRendererDto,
  IRendererModel,
  IRendererService,
} from '@codelab/frontend/abstract/application'
import {
  getBuilderService,
  getRuntimeComponentService,
  getRuntimeElementService,
  getRuntimePageService,
} from '@codelab/frontend/abstract/application'
import {
  componentRef,
  isComponentRef,
  pageRef,
} from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
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
  get builderService() {
    return getBuilderService(this)
  }

  @computed
  get runtimeComponentService() {
    return getRuntimeComponentService(this)
  }

  @computed
  get runtimeElementService() {
    return getRuntimeElementService(this)
  }

  @computed
  get runtimePageService() {
    return getRuntimePageService(this)
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
  reloadActiveRenderer() {
    if (!this.activeRenderer) {
      return
    }

    const currentRenderer = this.activeRenderer.current
    const { containerNode } = currentRenderer

    // detach current page/components with elements and stores from root store
    currentRenderer.runtimeRootContainerNode.detach()

    // reinitialize renderer container node, this will recompute all properties and rerender
    currentRenderer.containerNode = isComponentRef(containerNode)
      ? componentRef(containerNode.current)
      : pageRef(containerNode.current)

    // reset builder tree selected node
    this.builderService.selectElementNode(
      currentRenderer.runtimeRootContainerNode.runtimeRootElement,
    )
  }
}
