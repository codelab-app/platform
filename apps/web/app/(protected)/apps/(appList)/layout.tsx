import { AppListHeader } from '@codelab/frontend-application-app/views'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { PropsWithChildren } from 'react'
import React from 'react'

const AppsRouteLayout = async ({ children }: PropsWithChildren) => {
  return (
    <DashboardTemplate Header={<AppListHeader />}>{children}</DashboardTemplate>
  )
}

export default AppsRouteLayout
