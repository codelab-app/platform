import type { CodelabPage } from '@codelab/frontend/abstract/types'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import { DynamicDashboardTemplate } from '@codelab/frontend/presentation/view'
import React from 'react'

export type UsersView = CodelabPage<DashboardTemplateProps>

export const UsersViewLayout: UsersView['Layout'] = ({ children }) => {
  return <DynamicDashboardTemplate>{children}</DynamicDashboardTemplate>
}
