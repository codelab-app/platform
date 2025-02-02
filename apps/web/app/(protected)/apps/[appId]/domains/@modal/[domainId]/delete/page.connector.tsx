'use client'

import { DeleteDomainModal } from '@codelab/frontend-application-domain/use-cases/delete-domain'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

export const DomainDeleteConnector = observer(({ id }: { id: string }) => {
  const { domainDomainService } = useDomainStore()
  const domain = domainDomainService.domains.get(id)

  if (!domain) {
    return null
  }

  return <DeleteDomainModal domain={domain} />
})
