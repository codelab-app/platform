import { DomainsPageHeader } from '@codelab/frontend-application-domain/views'
import { DynamicDashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import React from 'react'

const DomainsPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DynamicDashboardTemplate Header={<DomainsPageHeader />}>
      {children}
    </DynamicDashboardTemplate>
  )
}

export default DomainsPageLayout
