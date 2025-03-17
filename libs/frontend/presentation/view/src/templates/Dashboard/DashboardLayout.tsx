import type { UrlPathParams } from '@codelab/frontend/abstract/types'
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

/**
 * We either
 */
export type DashboardLayoutProps<
  Slots extends keyof DashboardSections = never,
  Params extends keyof UrlPathParams = never,
> = {
  [K in Slots]: ReactNode
} & {
  params: Promise<{
    [K in keyof UrlPathParams]: K extends Params ? string : never
  }>
  children: ReactNode
}

/**
 * @deprecated Example only
 */
type _OnlyHeader = DashboardLayoutProps<'header', 'appId'>

/**
 * @deprecated Example only
 */
type _All = DashboardLayoutProps

/**
 * Our inferred slot types make it such that if key is not specified, the prop does not exist, so we need to spread it via `...slots`
 */
export const DashboardLayout = async <
  Slots extends keyof DashboardSections = never,
  Params extends keyof UrlPathParams = never,
>({
  children,
  params,
  ...slots
}: DashboardLayoutProps<Slots, Params>) => {
  const { appId, pageId } = await params

  return (
    <Dashboard
      {...slots}
      appId={appId}
      contentStyles={{ paddingTop: '0rem' }}
      pageId={pageId}
    >
      {children}
    </Dashboard>
  )
}

DashboardLayout.displayName = 'DashboardLayout'
