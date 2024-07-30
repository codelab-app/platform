import type {
  IRendererService,
  IRuntimeComponentService,
  IRuntimeElementService,
} from '../renderer'

/**
 * Moved other application services to hooks
 */
export interface IApplicationStore {
  rendererService: IRendererService
  runtimeComponentService: IRuntimeComponentService
  runtimeElementService: IRuntimeElementService
}
