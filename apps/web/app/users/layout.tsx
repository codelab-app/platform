import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'
import React from 'react'

const UsersRouteLayout = ({ children }: { children: ReactNode }) => {
  return <DashboardTemplate>{children}</DashboardTemplate>
}

export default UsersRouteLayout
