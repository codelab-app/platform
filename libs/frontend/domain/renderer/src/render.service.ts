import type {
  IRenderer,
  IRenderService,
  RendererProps,
} from '@codelab/frontend/abstract/core'
import {
  componentRef,
  getRendererId,
  RendererType,
} from '@codelab/frontend/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { Renderer } from './renderer.model'

@model('@codelab/RenderService')
export class RenderService
  extends Model({
    activeRenderer: prop<Nullable<Ref<IRenderer>>>(() => null).withSetter(),
    /**
     * These are renderers for the public, they are keyed by pageId
     */
    renderers: prop(() => objectMap<IRenderer>()),
  })
  implements IRenderService
{
  @modelAction
  addRenderer = (props: RendererProps) => {
    let renderer = this.renderers.get(getRendererId(props.id))

    if (!renderer) {
      renderer = Renderer.create(props)

      /**
       * setup runtime props for component builder
       * this is different from the one created in component-render-pipe
       * because the other one creates runtime props for component instances
       * while this one doesn't pass by the component pipe at all
       */

      if (props.rendererType === RendererType.ComponentBuilder) {
        renderer.addRuntimeProps(componentRef(props.id))
      }

      this.renderers.set(props.id, renderer)
    }

    return renderer
  }
}
