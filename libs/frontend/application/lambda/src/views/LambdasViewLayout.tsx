import { type CodelabPage } from '@codelab/frontend/abstract/types'
import type { DashboardTemplateProps } from '@codelab/frontend-presentation-view/templates'
import { DynamicDashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import React from 'react'
import { LambdasViewHeader } from './LambdasViewHeader'

export type ILambdasView = CodelabPage<DashboardTemplateProps>

export const LambdasViewLayout: ILambdasView['Layout'] = ({ children }) => {
  return (
    <DynamicDashboardTemplate Header={<LambdasViewHeader />}>
      {children}
    </DynamicDashboardTemplate>
  )
}
