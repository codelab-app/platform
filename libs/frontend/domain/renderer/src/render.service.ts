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
     * These are renderers for the public
     */
    renderers: prop(() => objectMap<IRenderer>()),
  })
  implements IRenderService
{
  // @computed
  // get elementService() {
  //   return this._elementService.current
  // }
  //
  // @computed
  // get componentService() {
  //   return this._componentService.current
  // }
  @modelFlow
  @transaction
  addRenderer = _async(function* (
    this: RenderService,
    props: RendererProps & { id: string },
  ) {
    const existing = this.renderers.get(props.id)

    if (!existing) {
      const renderer = yield* _await(Renderer.init(props))

      this.renderers.set(props.id, renderer)

      return renderer
    }

    existing.initForce(props.pageTree, props.appTree)

    return existing
  })
}
