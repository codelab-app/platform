import React, { PropsWithChildren } from 'react'
import { DashboardLayout } from './DashboardLayout'
import { DashboardSidebarNavigation } from './DashboardSidebarNavigation'

/**
 * The initial layout when entering the builder view
 */
export const MainDashboardTemplate = ({ children }: PropsWithChildren<any>) => {
  return (
    <DashboardLayout SidebarNavigation={DashboardSidebarNavigation}>
      {children}
    </DashboardLayout>
  )
}
