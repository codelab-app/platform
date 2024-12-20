'use client'

import { useDomainService } from '@codelab/frontend-application-domain/services'
import { UpdateDomainModal } from '@codelab/frontend-application-domain/use-cases/update-domain'
import { observer } from 'mobx-react-lite'

export const DomainUpdateContainer = observer(({ id }: { id: string }) => {
  const domain = useDomainService().getOneFromCache({ id })

  if (!domain) {
    return null
  }

  return <UpdateDomainModal domain={domain} />
})
