import type { IComponentDomainService } from '@codelab/frontend-abstract-domain'

import type { IBuilderService } from '../../builder'
import type {
  IRendererService,
  IRuntimeComponentService,
  IRuntimeElementService,
  IRuntimePageService,
} from '../../renderer'
import type { IRouterService } from '../router.service.interface'

/**
 * Moved other application services to hooks
 */
export interface IApplicationStore {
  builderService: IBuilderService
  rendererService: IRendererService
  /**
   * Used for builder to access search params, not used by the codebase. We use page props instead
   */
  routerService: IRouterService
  runtimeComponentService: IRuntimeComponentService
  runtimeElementService: IRuntimeElementService
  runtimePageService: IRuntimePageService
}
