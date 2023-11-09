import type {
  IBuilderDomainService,
  IElementTree,
} from '@codelab/frontend/abstract/domain'
import type { IRenderPipe } from './render.interface'
import type { RendererType } from './renderer.model.interface'

export interface IRendererDto {
  /**
   * This is the elementTree we are rendering, could be a page tree or a component tree
   */
  elementTree: IElementTree
  id: string
  /**
   * Allow override default for testing
   */
  renderPipe?: IRenderPipe
  rendererType: RendererType
  setSelectedNode?: IBuilderDomainService['setSelectedNode']
  urlSegments?: Record<string, string>
}
