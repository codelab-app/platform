/* eslint-disable @typescript-eslint/ban-types */
import type { UrlParams } from '@codelab/frontend/abstract/types'
import type { ReactNode } from 'react'

import { Dashboard } from './Dashboard'

/**
 * This declares all the possible parallel routes, but not all is required. The Next.js compiler will type check which is required
 */
export interface DashboardSections {
  configPane: ReactNode
  header: ReactNode
  modal: ReactNode
  primarySidebar: ReactNode
  secondaryPopover: ReactNode
}

export type DashboardLayoutProps<
  Slots extends keyof DashboardSections = never,
  Params extends keyof UrlParams = never,
> = {
  [K in Slots]: ReactNode
} & {
  params?: Params extends undefined
    ? {}
    : Promise<{
        [K in Params]: string
      }>
} & {
  children: ReactNode
}

/**
 * @deprecated Example only */
type _OnlyHeader = DashboardLayoutProps<'header', 'appId'>

/**
 * @deprecated Example only
 */
type _None = DashboardLayoutProps<'header'>

/**
 * Our inferred slot types make it such that if key is not specified, the prop does not exist, so we need to spread it via `...slots`
 */
export const DashboardLayout = async <
  Slots extends keyof DashboardSections = never,
  Params extends keyof UrlParams = never,
>({
  children,
  params,
  ...slots
}: DashboardLayoutProps<Slots, Params>) => {
  return (
    <Dashboard {...await params} {...slots}>
      {children}
    </Dashboard>
  )
}

DashboardLayout.displayName = 'DashboardLayout'
