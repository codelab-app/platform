'use client'

import { DomainList } from '@codelab/frontend-application-domain/use-cases/domain-list'
import { DomainsConnector } from '@codelab/frontend-application-domain/views'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

interface DomainListContainerProps {
  appId: string
}

export const DomainListContainer = observer<DomainListContainerProps>(
  ({ appId }) => {
    return (
      <DomainsConnector>
        {(domains) => <DomainList appId={appId} domains={domains} />}
      </DomainsConnector>
    )
  },
)
