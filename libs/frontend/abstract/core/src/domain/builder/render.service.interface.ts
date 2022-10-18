import { Nullable } from '@codelab/shared/abstract/types'
import { ObjectMap } from 'mobx-keystone'
import { IElementTree } from '../element'
import { IStore } from '../store'
import { IBuilderService } from './builder.service.interface'
import { IRenderer } from './renderer.model.interface'

export interface RendererProps {
  pageTree: IElementTree
  appStore: IStore
  appTree?: Nullable<IElementTree>
  isBuilder?: boolean
  set_selectedNode?: IBuilderService['set_selectedNode']
}

export interface IRenderService {
  renderers: ObjectMap<IRenderer>
  addRenderer(props: RendererProps & { id: string }): IRenderer
  // componentService: IComponentService
  // elementService: IElementService
}
