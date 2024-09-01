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

interface OptionalProps {
  configPane: ReactNode
  header: ReactNode
  primarySidebar: ReactNode
}

type DashboardLayoutProps<T extends Partial<OptionalProps> = never> = {
  [K in keyof OptionalProps]: K extends keyof T ? T[K] : never
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

export const DashboardLayout = <T extends Partial<OptionalProps> = never>({
  children,
  configPane,
  header,
  primarySidebar,
}: DashboardLayoutProps<T>) => {
  return (
    <Dashboard
      ConfigPane={configPane}
      Header={header}
      PrimarySidebar={primarySidebar}
      // PrimarySidebar={{
      //   default: ExplorerPaneType.Explorer,
      //   items: [
      //     {
      //       key: ExplorerPaneType.Components,
      //       render: <ComponentsPrimarySidebar />,
      //     },
      //     {
      //       key: ExplorerPaneType.Explorer,
      //       render: <BuilderPrimarySidebarContainer pageId={pageId} />,
      //     },
      //     {
      //       key: ExplorerPaneType.PageList,
      //       render: <PagesPrimarySidebar />,
      //     },
      //   ],
      // }}
      contentStyles={{ paddingTop: '0rem' }}
    >
      {children}
    </Dashboard>
  )
}
