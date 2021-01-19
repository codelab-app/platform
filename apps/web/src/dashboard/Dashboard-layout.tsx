import React from 'react'
import { DashboardMenuSidebar } from './Dashboard-menu--sidebar'
import { AppLayout, AppSidebarProps } from '@codelab/modules/layout-stories'

export const DashboardLayout: React.FunctionComponent = ({ children }) => {
  const sidebar: AppSidebarProps = {
    Menu: <DashboardMenuSidebar />,
    collapsible: false,
    collapsed: true,
  }

  return <AppLayout sidebar={sidebar}>{children}</AppLayout>
}
