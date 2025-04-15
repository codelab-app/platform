'use client'

import { DomainsConnector } from '@codelab/frontend-infra-connector'

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
