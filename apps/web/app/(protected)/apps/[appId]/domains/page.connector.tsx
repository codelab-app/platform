'use client'

import { DomainList } from '@codelab/frontend-application-domain/use-cases/domain-list'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

interface DomainListContainerProps {
  appId: string
}

export const DomainListConnector = observer<DomainListContainerProps>(
  ({ appId }) => {
    const { domainDomainService } = useDomainStore()
    const domains = domainDomainService.domainsList

    return <DomainList appId={appId} domains={domains} />
  },
)
