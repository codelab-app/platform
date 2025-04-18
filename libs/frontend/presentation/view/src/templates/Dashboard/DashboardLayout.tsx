import type {
  DashboardLayoutProps,
  DashboardSlots,
  UrlParams,
} from '@codelab/frontend-abstract-types'

import { Dashboard } from './Dashboard'

/**
 * Our inferred slot types make it such that if key is not specified, the prop does not exist, so we need to spread it via `...slots`
 */
export const DashboardLayout = async <
  Slots extends keyof DashboardSlots = never,
  Params extends keyof UrlParams = never,
>({
  children,
  params,
  ...slots
}: DashboardLayoutProps<Slots, Params>) => {
  return (
    <Dashboard params={await params} {...slots}>
      {children}
    </Dashboard>
  )
}

DashboardLayout.displayName = 'DashboardLayout'
