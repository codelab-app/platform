import { DomainsPageHeader } from '@codelab/frontend-application-domain/views'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import React from 'react'

const DomainsPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardTemplate Header={<DomainsPageHeader />}>
      {children}
    </DashboardTemplate>
  )
}

export default DomainsPageLayout
