import type { UrlPathParams } from '@codelab/frontend/abstract/types'
import type { ReactNode } from 'react'

import { Dashboard } from './Dashboard'

export interface DashboardSections {
  configPane: ReactNode
  header: ReactNode
  primarySidebar: ReactNode
  secondaryPopover: ReactNode
}

type DashboardLayoutProps<T extends Partial<DashboardSections> = never> =
  Partial<UrlPathParams> & {
    [K in keyof DashboardSections]: K extends keyof T ? T[K] : never
  } & {
    children: ReactNode
  }

/**
 * @deprecated Example only
 */
type _OnlyHeader = DashboardLayoutProps<{ header: ReactNode }>

/**
 * @deprecated Example only
 */
type _All = DashboardLayoutProps

export const DashboardLayout = <T extends Partial<DashboardSections> = never>({
  appId,
  children,
  configPane,
  header,
  pageId,
  primarySidebar,
  secondaryPopover,
}: DashboardLayoutProps<T>) => {
  return (
    <Dashboard
      ConfigPane={configPane}
      Header={header}
      PrimarySidebar={primarySidebar}
      SecondaryPopover={secondaryPopover}
      appId={appId}
      contentStyles={{ paddingTop: '0rem' }}
      pageId={pageId}
    >
      {children}
    </Dashboard>
  )
}
