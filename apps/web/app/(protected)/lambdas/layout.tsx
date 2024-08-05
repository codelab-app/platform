'use client'

import { LambdasViewHeader } from '@codelab/frontend-application-lambda/views'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import React, { type ReactNode } from 'react'

const LambdasRouteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardTemplate Header={<LambdasViewHeader />}>
      {children}
    </DashboardTemplate>
  )
}

export default LambdasRouteLayout
