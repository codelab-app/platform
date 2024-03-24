import type { CodelabPage } from '@codelab/frontend/abstract/types'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import { DynamicDashboardTemplate } from '@codelab/frontend/presentation/view'
import React from 'react'
import { AdminHeader } from './AdminViewHeader'

export type AdminView = CodelabPage<DashboardTemplateProps>

export const AdminViewLayout: AdminView['Layout'] = ({ children }) => {
  return (
    <DynamicDashboardTemplate Header={AdminHeader}>
      {children()}
    </DynamicDashboardTemplate>
  )
}
