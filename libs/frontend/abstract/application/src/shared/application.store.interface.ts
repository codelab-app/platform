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
    atomPagination: IPaginationService<IAtomModel, { name: string }>
    componentPagination: IPaginationService<IComponentModel, { name: string }>
    tagPagination: IPaginationService<ITagModel, { name: string }>
    typePagination: IPaginationService<ITypeModel, { name: string }>
  }
  rendererService: IRendererService
  routerService: IRouterService
  runtimeComponentService: IRuntimeComponentService
  runtimeElementService: IRuntimeElementService
  runtimePageService: IRuntimePageService
}
