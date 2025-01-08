import type {
  UrlPathParams,
  UrlPathParamsProps,
} from '@codelab/frontend/abstract/types'
import type { ReactNode } from 'react'

import { serverTracker, tracker } from '@codelab/frontend/shared/utils'

import { Dashboard } from './Dashboard'

/**
 * This declares all the possible parallel routes, but not all is required. The Next.js compiler will type check which is required
 */
type DashboardSections = Partial<{
  configPane: ReactNode
  header: ReactNode
  modal: ReactNode
  primarySidebar: ReactNode
  secondaryPopover: ReactNode
}>

export type DashboardLayoutProps<
  Slots extends keyof DashboardSections = never,
  Params extends keyof UrlPathParams = never,
> = {
  [K in keyof DashboardSections]: K extends Slots ? ReactNode : never
} & {
  params: {
    [K in keyof UrlPathParams]: K extends Params ? string : never
  }
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

export const DashboardLayout = <
  Slots extends keyof DashboardSections = never,
  Params extends keyof UrlPathParams = never,
>({
  children,
  configPane,
  header,
  modal,
  params,
  primarySidebar,
  secondaryPopover,
}: DashboardLayoutProps<Slots, Params>) => {
  const { appId, pageId } = params

  return (
    <Dashboard
      appId={appId}
      configPane={configPane}
      contentStyles={{ paddingTop: '0rem' }}
      header={header}
      modal={modal}
      pageId={pageId}
      primarySidebar={primarySidebar}
      secondaryPopover={secondaryPopover}
    >
      {children}
    </Dashboard>
  )
}

DashboardLayout.displayName = 'DashboardLayout'
