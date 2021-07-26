import React, { PropsWithChildren } from 'react'
import { DashboardLayout } from '../layout/DashboardLayout'
import { DashboardSidebarNavigation } from '../sections/DashboardSidebarNavigation'

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
