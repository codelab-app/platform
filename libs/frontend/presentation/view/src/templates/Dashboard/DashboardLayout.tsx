import type { UrlPathParams } from '@codelab/frontend/abstract/types'
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

type DashboardLayoutProps<T extends DashboardSections = never> = {
  [K in keyof DashboardSections]: K extends keyof T ? T[K] : never
} & {
  params: Partial<UrlPathParams>
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

export const DashboardLayout = <T extends DashboardSections = never>({
  children,
  configPane,
  header,
  modal,
  params,
  primarySidebar,
  secondaryPopover,
}: DashboardLayoutProps<T>) => {
  serverTracker.useEvent({
    componentName: 'DashboardLayout',
    event: 'Rendered',
  })

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
