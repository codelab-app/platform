import type { Nullable } from '@codelab/shared/abstract/types'
import type { IBuilderDomainService } from '../builder'
import type { IElementTree } from '../element'
import type { IRenderPipe } from './render.interface'
import type { RendererType } from './renderer.model.interface'

export interface IRendererDto {
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
  /**
   * Allow override default for testing
   */
  renderPipe?: IRenderPipe
  rendererType: RendererType
  setSelectedNode?: IBuilderDomainService['setSelectedNode']
  urlSegments?: Record<string, string>
}