'use client'

import { DomainsConnector } from '../../views'
import { DomainList } from './DomainList'

interface DomainListContainerProps {
  appId: string
}

export const DomainListContainer = ({ appId }: DomainListContainerProps) => {
  return (
    <DomainsConnector>
      {(domains) => <DomainList appId={appId} domains={domains} />}
    </DomainsConnector>
  )
}

DomainListContainer.displayName = 'DomainListContainer'
