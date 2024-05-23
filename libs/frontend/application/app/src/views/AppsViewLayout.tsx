import { type CodelabPage } from '@codelab/frontend/abstract/types'
import type { DashboardTemplateProps } from '@codelab/frontend-presentation-view/templates'
import { DynamicDashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import React from 'react'
import { AppsViewHeader } from './AppsViewHeader'

export type AppsView = CodelabPage<DashboardTemplateProps>

export const AppsViewLayout: AppsView['Layout'] = ({ children }) => {
  return (
    <DynamicDashboardTemplate Header={AppsViewHeader}>
      {children}
    </DynamicDashboardTemplate>
  )
}
