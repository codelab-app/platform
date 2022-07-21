import { IElementTree, IRenderer, IStore } from '@codelab/shared/abstract/core'
import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { AnyModel, ModelClass, ObjectMap } from 'mobx-keystone'

export interface IRenderService {
  renderers: ObjectMap<IRenderer>

  addRenderer(
    id: string,
    pageTree: IElementTree,
    appStore: IStore,
    appTree?: Nullable<IElementTree>,
    platformState?: Nullish<ModelClass<AnyModel>>,
    isBuilder?: boolean,
  ): IRenderer
}
