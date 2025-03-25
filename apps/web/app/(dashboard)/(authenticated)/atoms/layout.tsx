import type { DashboardLayoutProps } from '@codelab/frontend-presentation-view/templates'

import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'
import { ReactNode } from 'react'

const Layout = ({
  children,
  header,
  primarySidebar,
  secondaryPopover,
}: DashboardLayoutProps<'header' | 'primarySidebar' | 'secondaryPopover'>) => {
  return (
    <DashboardLayout<'header' | 'primarySidebar' | 'secondaryPopover'>
      header={header}
      primarySidebar={primarySidebar}
      secondaryPopover={secondaryPopover}
    >
      {children}
    </DashboardLayout>
  )
}

export default Layout
