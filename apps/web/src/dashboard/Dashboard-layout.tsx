import { WithRouterProps } from 'next/dist/client/with-router'
import React from 'react'
import { DashboardMenuSidebar } from './Dashboard-menu--sidebar'
import { AppLayout, AppSidebarProps } from '@codelab/modules/layout-stories'

export const DashboardLayout: React.FunctionComponent<WithRouterProps> = ({
  children,
}) => {
  const sidebar: AppSidebarProps = {
    Menu: <DashboardMenuSidebar />,
    collapsed: true,
    // collapsed: layout.state.value.sidebar === 'inactive',
    // onCollapse: () => layout.send('TOGGLE_SIDEBAR'),
  }

  return <AppLayout sidebar={sidebar}>{children}</AppLayout>
}
