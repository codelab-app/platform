import {
  IElementTree,
  IRenderer,
  IRenderService,
} from '@codelab/shared/abstract/core'
import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import {
  AnyModel,
  Model,
  model,
  modelAction,
  ModelClass,
  objectMap,
  prop,
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
  @modelAction
  addRenderer(
    id: string,
    pageTree: IElementTree,
    appTree?: Nullable<IElementTree>,
    platformState?: Nullish<ModelClass<AnyModel>>,
  ) {
    const existing = this.renderers.get(id)

    if (!existing) {
      const renderer = Renderer.init(pageTree, appTree, platformState)

      this.renderers.set(id, renderer)

      return renderer
    }

    return existing
  }
}
