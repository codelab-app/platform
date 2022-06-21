import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { AnyModel, ModelClass, ObjectMap } from 'mobx-keystone'
import { IRenderer } from '../builder'
import { IElementTree } from '../element'
import { IStore } from '../store'

export interface IBaseRenderer {
  /**
   * Renderer for multiple contexts
   * - page, component etc
   */
  renderers: ObjectMap<IRenderer>
  initRenderer(
    id: string,
    pageTree: IElementTree,
    appStore: IStore,
    appTree: Nullable<IElementTree>,
    appStore: IStore,
    platformState?: Nullish<ModelClass<AnyModel>>,
  ): IRenderer
}
