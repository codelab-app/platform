import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'
import type { IRenderer } from '../builder'
import type { IElementTree } from '../element'
import type { IStore } from '../store'

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
