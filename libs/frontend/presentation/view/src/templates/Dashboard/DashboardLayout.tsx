import type { UrlParams } from '@codelab/frontend/abstract/types'
import type { PropsWithChildren, ReactNode } from 'react'

import type { ParamProps, SlotProps } from '../props.type'

import { Dashboard } from './Dashboard'

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
    <Dashboard {...await params} {...slots}>
      {children}
    </Dashboard>
  )
}

DashboardLayout.displayName = 'DashboardLayout'
