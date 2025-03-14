'use client'

import { AppConnector } from '@codelab/frontend-application-app/views'
import { DomainsPageHeader } from '@codelab/frontend-application-domain/views'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

export const DomainsPageHeaderContainer = observer(
  ({ appId }: { appId: string }) => {
    return (
      <AppConnector id={appId}>
        {(app) => <DomainsPageHeader app={app} />}
      </AppConnector>
    )
  },
)
