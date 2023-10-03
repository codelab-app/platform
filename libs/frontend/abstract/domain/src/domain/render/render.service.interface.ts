import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { IBuilderService } from '../builder/builder.service.interface'
import type { IElementTree } from '../element'
import type { IRenderer, RendererType } from './renderer.model.interface'

export interface RendererProps {
  /**
   * This is the elementTree we are rendering, could be a page tree or a component tree
   */
  elementTree: IElementTree
  // Renderer id, could be page id or component id etc
  id: string
  /**
   * Optional provider tree to wrap the element tree. If we render a page we'll need this provider tree.
   *
   * But if we render a component, we don't need it
   */
  providerTree?: Nullable<IElementTree>
  rendererType: RendererType
  setSelectedNode?: IBuilderService['setSelectedNode']
  urlSegments?: Record<string, string>
}

export interface IRenderService {
  activeRenderer: Nullable<Ref<IRenderer>>
  renderers: ObjectMap<IRenderer>
  addRenderer(props: RendererProps): IRenderer
  setActiveRenderer(renderer: Ref<IRenderer>): void
}
