import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend-abstract-domain'

import type { IBuilderService } from '../builder'
import type { RendererType } from './renderer.model.interface'

export interface IRendererDto {
  /**
   * This is the elementTree we are rendering, could be a page tree or a component tree
   */
  containerNode: IComponentModel | IPageModel
  /**
   * Must not use container id
   */
  id: string
  rendererType: RendererType
  setSelectedNode?: IBuilderService['setSelectedNode']
}
