import type { IBuilderService } from '../builder'
import type {
  IRendererService,
  IRuntimeComponentService,
  IRuntimeElementService,
  IRuntimePageService,
} from '../renderer'
import type { IRouterService } from './router.service.interface'

/**
 * Moved other application services to hooks
 */
export interface IApplicationStore {
  builderService: IBuilderService
  rendererService: IRendererService
  routerService: IRouterService
  runtimeComponentService: IRuntimeComponentService
  runtimeElementService: IRuntimeElementService
  runtimePageService: IRuntimePageService
}
