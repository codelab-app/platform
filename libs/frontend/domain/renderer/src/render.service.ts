import type {
  IRenderer,
  IRenderService,
  RendererProps,
} from '@codelab/frontend/abstract/core'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { Renderer } from './renderer.model'

@model('@codelab/RenderService')
export class RenderService
  extends Model({
    /**
     * These are renderers for the public, they are keyed by pageId
     */
    renderers: prop(() => objectMap<IRenderer>()),
  })
  implements IRenderService
{
  @modelAction
  addRenderer = (props: RendererProps) => {
    let renderer = this.renderers.get(props.id)

    if (!renderer) {
      renderer = Renderer.create(props)

      this.renderers.set(props.id, renderer)
    }

    return renderer
  }
}
