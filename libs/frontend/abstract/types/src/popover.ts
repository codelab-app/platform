import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

/**
 * Decouples router from services
 */
export interface IPopover<TOpen = never> {
  close(router: AppRouterInstance): void
  open(router: AppRouterInstance, args?: TOpen): void
}
