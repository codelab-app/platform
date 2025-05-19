import type {
  IExpressionTransformer,
  IRendererDto,
  IRendererModel,
  IRendererService,
} from '@codelab/frontend/abstract/application'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'

import {
  getRuntimeComponentService,
  getRuntimeElementService,
  getRuntimePageService,
} from '@codelab/frontend/abstract/application'
import { isPage } from '@codelab/frontend/abstract/domain'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'

import { RendererModel } from '../store/renderer.model'
import { ExpressionTransformer } from './expression-transformer.service'

@model('@codelab/RendererService')
export class RendererService
  extends Model({
    activeRenderer: prop<Nullable<Ref<IRendererModel>>>(
      () => null,
    ).withSetter(),
    expressionTransformer: prop<IExpressionTransformer>(
      () => new ExpressionTransformer({}),
    ),
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

  @computed
  get runtimePageService() {
    return getRuntimePageService(this)
  }

  @modelAction
  hydrate = (rendererDto: IRendererDto) => {
    // renderer should use a composite key so we don't a new one on every render
    const compositeKey = RendererModel.compositeKey(
      rendererDto.containerNode,
      rendererDto.rendererType,
    )

    let renderer = this.renderers.get(compositeKey)

    if (!renderer) {
      renderer = RendererModel.create({
        ...rendererDto,
        containerNode: rendererDto.containerNode,
        id: compositeKey,
        runtimeRootContainerNode: isPage(rendererDto.containerNode)
          ? this.runtimePageService.add(rendererDto.containerNode)
          : this.runtimeComponentService.add(rendererDto.containerNode),
      })

      this.renderers.set(compositeKey, renderer)
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
