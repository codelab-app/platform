'use client'

import { observer } from 'mobx-react-lite'

import { DomainsConnector } from '../../views/Domains.connector'
import { DomainList } from './DomainList'

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

DomainListContainer.displayName = 'DomainListContainer'
