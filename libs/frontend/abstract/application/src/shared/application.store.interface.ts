import type { IRendererService } from '../renderer'

/**
 * Moved other application services to hooks
 */
export interface IApplicationStore {
  rendererService: IRendererService
}
