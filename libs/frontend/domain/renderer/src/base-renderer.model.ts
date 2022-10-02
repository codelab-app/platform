import type {
  IBaseRenderer,
  IElementTree,
  IRenderer,
  IStore,
} from '@codelab/frontend/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
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
   */
  @modelAction
  initRenderer(
    id: string,
    pageTree: IElementTree,
    appStore: IStore,
    appTree: Nullable<IElementTree>,
    isBuilder?: boolean,
  ) {
    const renderer = Renderer.init(pageTree, appStore, appTree, isBuilder)

    this.renderers.set(id, renderer)

    return renderer
  }
}
