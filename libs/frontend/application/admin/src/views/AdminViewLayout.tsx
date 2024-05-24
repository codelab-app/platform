import type { CodelabPage } from '@codelab/frontend/abstract/types'
import type { DashboardTemplateProps } from '@codelab/frontend-presentation-view/templates'
import { DynamicDashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import React from 'react'
import { AdminViewHeader } from './AdminViewHeader'

export type AdminView = CodelabPage<DashboardTemplateProps>

export const AdminViewLayout: AdminView['Layout'] = ({ children }) => {
  return (
    <DynamicDashboardTemplate Header={AdminViewHeader}>
      {children}
    </DynamicDashboardTemplate>
  )
}
