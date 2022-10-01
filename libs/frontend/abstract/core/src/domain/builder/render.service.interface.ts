import { Nullable } from '@codelab/shared/abstract/types'
import { ObjectMap } from 'mobx-keystone'
import { IElementTree } from '../element'
import { IStore } from '../store'
import { IBuilderService } from './builder.service.interface'
import { IRenderer } from './renderer.model.interface'

export interface IRenderService {
  renderers: ObjectMap<IRenderer>

  addRenderer(
    id: string,
    pageTree: IElementTree,
    appTree: Nullable<IElementTree>,
    appStore: IStore,
    isBuilder?: boolean,
    set_selectedNode?: IBuilderService['set_selectedNode'],
  ): IRenderer
}
