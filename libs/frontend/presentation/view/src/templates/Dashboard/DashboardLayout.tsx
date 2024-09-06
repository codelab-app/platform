import type { UrlPathParams } from '@codelab/frontend/abstract/types'
import type { ReactNode } from 'react'
import React from 'react'
import { Dashboard } from './Dashboard'

/**
 * Need to make un-used types `never` not optional, or else `next.js` build time validation will throw error
 *
 * T will be inferred based on the props
 */
// type DashboardLayoutProps<
//   T extends 'configPane' | 'header' | 'primarySidebar',
// > = {
//   children: ReactNode
// } & {
//   configPane: T extends 'configPane' ? ReactNode : never
//   header: T extends 'header' ? ReactNode : never
//   primarySidebar: T extends 'primarySidebar' ? ReactNode : never
// }

export interface DashboardSections {
  configPane: ReactNode
  header: ReactNode
  primarySidebar: ReactNode
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
}: DashboardLayoutProps<T>) => {
  return (
    <Dashboard
      ConfigPane={configPane}
      Header={header}
      PrimarySidebar={primarySidebar}
      appId={appId}
      contentStyles={{ paddingTop: '0rem' }}
      pageId={pageId}
    >
      {children}
    </Dashboard>
  )
}
