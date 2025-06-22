import type { DashboardLayoutProps } from '@codelab/frontend-abstract-types'

import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'

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
