import { DomainsViewHeader } from '@codelab/frontend-application-domain/views'
import { DynamicDashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import React from 'react'

const DomainsRouteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DynamicDashboardTemplate Header={<DomainsViewHeader />}>
      {children}
    </DynamicDashboardTemplate>
  )
}

export default DomainsRouteLayout
