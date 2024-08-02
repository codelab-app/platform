import { AppsViewHeader } from '@codelab/frontend-application-app/views'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { PropsWithChildren } from 'react'
import React from 'react'

const AppListLayout = async ({ children }: PropsWithChildren) => {
  return (
    <DashboardTemplate Header={<AppsViewHeader />}>
      {children}
    </DashboardTemplate>
  )
}

export default AppListLayout
