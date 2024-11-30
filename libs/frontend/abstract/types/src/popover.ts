import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

/**
 * Decouples router from services
 */
export interface IPopover {
  close(router: AppRouterInstance): void
  open(router: AppRouterInstance, args?: unknown): void
}
