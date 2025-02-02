import type {
  IRendererDto,
  IRendererModel,
  IRendererService,
} from '@codelab/frontend/abstract/application'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'

import {
  getRuntimeComponentService,
  getRuntimeElementService,
} from '@codelab/frontend/abstract/application'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'

import { Renderer } from '../store/renderer.model'

@model('@codelab/RendererService')
export class RendererService
  extends Model({
    activeRenderer: prop<Nullable<Ref<IRendererModel>>>(
      () => null,
    ).withSetter(),
    /**
     * These are renderers for the public, they are keyed by containerId
     */
    renderers: prop(() => objectMap<IRendererModel>()),
  })
  implements IRendererService
{
  /**
   * Get the current container node
   */
  @computed
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

      // Reset the pre/post render actions for all elements when navigating.
      // The stopper is used to prevent infinite re-rendering when the action mutates a state
      // which causes re-rendering the root container node.

      this.runtimeElementService.elementsList.forEach((runtimeElement) => {
        runtimeElement.setPreRenderActionsDone(false)
        runtimeElement.setPostRenderActionsDone(false)
      })
    }

    return renderer
  }
}
