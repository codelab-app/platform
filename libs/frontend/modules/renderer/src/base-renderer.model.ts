import {
  IBaseRenderer,
  IElementTree,
  IRenderer,
  IStore,
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
/**
 * Used by models to extend for adding renderers to the model
 */
@model('@codelab/Renderer')
export class BaseRenderer
  extends Model({
    renderers: prop(() => objectMap<IRenderer>()),
  })
  implements IBaseRenderer
{
  /**
   * @param id - App or page id
   * @param pageTree
   * @param appTree
   * @param platformState
   */
  @modelAction
  initRenderer(
    id: string,
    pageTree: IElementTree,
    appStore: IStore,
    appTree: Nullable<IElementTree>,
    platformState?: Nullish<ModelClass<AnyModel>>,
  ) {
    const renderer = Renderer.init(pageTree, appStore, appTree, platformState)
    this.renderers.set(id, renderer)

    return renderer
  }
}
