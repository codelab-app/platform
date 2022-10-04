import { Nullable } from '@codelab/shared/abstract/types'
import { ObjectMap } from 'mobx-keystone'
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
    isBuilder?: boolean,
  ): IRenderer
}
