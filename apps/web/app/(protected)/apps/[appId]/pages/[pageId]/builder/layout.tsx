import type { PageContextParams } from '@codelab/frontend/abstract/types'

import {
  DashboardLayout,
  type DashboardSections,
} from '@codelab/frontend-presentation-view/templates'
import { type ReactNode } from 'react'

const Layout = ({
  children,
  configPane,
  header,
  params: { appId, pageId },
  primarySidebar,
  secondaryPopover,
}: DashboardSections & {
  params: PageContextParams
  children: ReactNode
}) => {
  return (
    <DashboardLayout<DashboardSections>
      appId={appId}
      configPane={configPane}
      header={header}
      pageId={pageId}
      primarySidebar={primarySidebar}
      secondaryPopover={secondaryPopover}
    >
      {children}
    </DashboardLayout>
  )
}

export default Layout
