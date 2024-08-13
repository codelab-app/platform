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
  rendererService: IRendererService
  routerService: IRouterService
  runtimeComponentService: IRuntimeComponentService
  runtimeElementService: IRuntimeElementService
  runtimePageService: IRuntimePageService
}
