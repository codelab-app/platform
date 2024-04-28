import { type CodelabPage } from '@codelab/frontend/abstract/types'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import { DynamicDashboardTemplate } from '@codelab/frontend/presentation/view'
import React from 'react'
import { LambdasViewHeader } from './LambdasViewHeader'

export type LambdasView = CodelabPage<DashboardTemplateProps>

export const LambdasViewLayout: LambdasView['Layout'] = ({ children }) => {
  return (
    <DynamicDashboardTemplate Header={LambdasViewHeader}>
      {children}
    </DynamicDashboardTemplate>
  )
}
