'use client'

import { AppConnector } from '@codelab/frontend-application-app/views'

import { DomainsPageHeader } from './DomainsPageHeader'

export const DomainsPageHeaderContainer = ({ appId }: { appId: string }) => {
  return (
    <AppConnector id={appId}>
      {(app) => <DomainsPageHeader app={app} />}
    </AppConnector>
  )
}

DomainsPageHeaderContainer.displayName = 'DomainsPageHeaderContainer'
