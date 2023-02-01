import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'
import type { IElementTree } from '../element'
import type { IStore } from '../store'
import type { IBuilderService } from './builder.service.interface'
import type { IRenderer } from './renderer.model.interface'

export interface RendererProps {
  pageTree: IElementTree
  appStore: IStore
  appTree?: Nullable<IElementTree>
  isBuilder?: boolean
  isComponentBuilder?: boolean
  set_selectedNode?: IBuilderService['set_selectedNode']
}

export interface IRenderService {
  renderers: ObjectMap<IRenderer>
  addRenderer(props: RendererProps & { id: string }): Promise<IRenderer>
  // componentService: IComponentService
  // elementService: IElementService
}
