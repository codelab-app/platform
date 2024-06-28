'use client'

import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { PageDetailHeader } from '@codelab/frontend-application-page/views'
import { DynamicDashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import React from 'react'

const PagePreviewRouteLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <DynamicDashboardTemplate Header={() => <PageDetailHeader />}>
      {children}
    </DynamicDashboardTemplate>
  )
}

export default PagePreviewRouteLayout
