'use client'

import { LambdasViewHeader } from '@codelab/frontend-application-lambda/views'
import { Dashboard } from '@codelab/frontend-presentation-view/templates'
import React, { type ReactNode } from 'react'

const LambdasRouteLayout = ({ children }: { children: ReactNode }) => {
  return <Dashboard Header={<LambdasViewHeader />}>{children}</Dashboard>
}

export default LambdasRouteLayout
