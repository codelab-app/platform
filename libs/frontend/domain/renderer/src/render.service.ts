import type {
  IRenderer,
  IRenderService,
  RendererProps,
} from '@codelab/frontend/abstract/core'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
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
  @modelFlow
  @transaction
  addRenderer = _async(function* (this: RenderService, props: RendererProps) {
    const renderer = yield* _await(Renderer.create(props))

    this.renderers.set(props.id, renderer)

    return renderer
  })
}
