import type { Identity } from '@codelab/shared/abstract/types'
import type { ReactNode } from 'react'

import type { ParamProps } from './params.props'
import type { SlotProps } from './slot.props'
import type { UrlParams } from './url-params'

/**
 * Non-dashboard layout has no slots, only params
 */
export type LayoutProps<Params extends keyof UrlParams = never> =
  ParamProps<Params> & {
    children: ReactNode
  }

/**
 * This declares all the possible parallel routes, but not all is required. The Next.js compiler will type check which is required
 */
export interface DashboardSlots {
  configPane: ReactNode
  header: ReactNode
  modal: ReactNode
  primarySidebar: ReactNode
  secondaryPopover: ReactNode
}

export type DashboardLayoutProps<
  SlotKey extends keyof DashboardSlots = never,
  ParamKey extends keyof UrlParams = never,
> = ParamProps<ParamKey> & SlotProps<SlotKey> & { children: ReactNode }

/**
 * @deprecated Example only */
type _OnlyHeader = DashboardLayoutProps<'header', 'appId'>

/**
 * @deprecated Example only
 */
type _None = DashboardLayoutProps<'header'>

/**
 * Coped from `DashboardLayoutProps`
 */
export type DashboardProps = Partial<DashboardSlots> & {
  params?: Partial<UrlParams>
  children: ReactNode
}
