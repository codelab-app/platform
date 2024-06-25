import type { CodelabPage } from '@codelab/frontend/abstract/types'
import type { DashboardTemplateProps } from '@codelab/frontend-presentation-view/templates'
import { DynamicDashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import React from 'react'
import { DomainsViewHeader } from './DomainsViewHeader'

export type IDomainsView = CodelabPage<DashboardTemplateProps>

export const DomainsViewLayout: IDomainsView['Layout'] = ({ children }) => {
  return (
    <DynamicDashboardTemplate Header={DomainsViewHeader}>
      {children}
    </DynamicDashboardTemplate>
  )
}
