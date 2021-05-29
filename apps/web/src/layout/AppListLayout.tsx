import React, { PropsWithChildren } from 'react'
import { AppListSidebarNavigation } from '../sections/AppListSidebarNavigation'
import { DashboardLayout } from '../templates/DashboardLayout'

/**
 * The initial layout when entering the builder view
 */
export const AppListLayout = ({ children }: PropsWithChildren<any>) => {
  return (
    <DashboardLayout SidebarNavigation={AppListSidebarNavigation}>
      {children}
    </DashboardLayout>
  )
}
