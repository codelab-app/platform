'use client'

import { UpdateDomainModal } from '@codelab/frontend-application-domain/use-cases/update-domain'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

export const DomainUpdateConnector = observer(({ id }: { id: string }) => {
  const { domainDomainService } = useDomainStore()
  const domain = domainDomainService.domains.get(id)

  if (!domain) {
    return null
  }

  return <UpdateDomainModal domain={domain} />
})
