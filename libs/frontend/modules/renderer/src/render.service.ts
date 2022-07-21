import type {
  IElementTree,
  IRenderer,
  IRenderService,
  IStore,
} from '@codelab/shared/abstract/core'
import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
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
    appStore: IStore,
    appTree?: Nullable<IElementTree>,
    platformState?: Nullish<ModelClass<AnyModel>>,
    isBuilder?: boolean,
  ) {
    const existing = this.renderers.get(id)

    if (!existing) {
      const renderer = Renderer.init(
        pageTree,
        appStore,
        appTree,
        platformState,
        isBuilder,
      )

      this.renderers.set(id, renderer)

      return renderer
    }

    return existing
  }
}
