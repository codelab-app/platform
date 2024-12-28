'use client'

import { useDomainService } from '@codelab/frontend-application-domain/services'
import { DeleteDomainModal } from '@codelab/frontend-application-domain/use-cases/delete-domain'
import { observer } from 'mobx-react-lite'

export const DomainDeleteContainer = observer(({ id }: { id: string }) => {
  const domain = useDomainService().getOneFromCache({ id })

  if (!domain) {
    return null
  }

  return <DeleteDomainModal domain={domain} />
})
