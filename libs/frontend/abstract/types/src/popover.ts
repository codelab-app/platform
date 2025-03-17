import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

/**
 * Decouples router from services
 */
export interface IPopover<TOpen = undefined, TClose = undefined> {
  close(router: AppRouterInstance, args?: TClose): void
  open(router: AppRouterInstance, args?: TOpen): void
}
