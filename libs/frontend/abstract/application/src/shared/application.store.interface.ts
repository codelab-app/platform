import type {
  IAtomModel,
  IComponentModel,
  ITagModel,
  ITypeModel,
} from '@codelab/frontend/abstract/domain'
import type { IBuilderService } from '../builder'
import type {
  IRendererService,
  IRuntimeComponentService,
  IRuntimeElementService,
  IRuntimePageService,
} from '../renderer'
import type { IPaginationService } from '../services'
import type { IRouterService } from './router.service.interface'

/**
 * Moved other application services to hooks
 */
export interface IApplicationStore {
  builderService: IBuilderService
  pagination: {
    atomPagination: IPaginationService<IAtomModel>
    componentPagination: IPaginationService<IComponentModel>
    tagPagination: IPaginationService<ITagModel>
    typePagination: IPaginationService<ITypeModel>
  }
  rendererService: IRendererService
  routerService: IRouterService
  runtimeComponentService: IRuntimeComponentService
  runtimeElementService: IRuntimeElementService
  runtimePageService: IRuntimePageService
}
