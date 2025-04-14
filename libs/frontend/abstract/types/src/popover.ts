import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

/**
 * Decouples router from services
 */
export interface IPopover<TOpen = never, TClose = never> {
  close(
    router: AppRouterInstance,
    /**
     * When you have a conditional type like T extends U ? X : Y and T is a union type, TypeScript distributes the conditional over each member of the union.
     *
     * By wrapping the types in square brackets (creating tuple types), you prevent this distribution behavior.
     */
    ...args: [TClose] extends [never] ? [args?: TClose] : [args: TClose]
  ): void
  open(
    router: AppRouterInstance,
    ...args: [TOpen] extends [never] ? [args?: TOpen] : [args: TOpen]
  ): void
}
