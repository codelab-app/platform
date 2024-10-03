'use client'

import { useDomainService } from '@codelab/frontend-application-domain/services'
import { DomainList } from '@codelab/frontend-application-domain/use-cases/domain-list'
import { observer } from 'mobx-react-lite'

export const DomainListContainer = observer(() => {
  const domains = useDomainService().getAllFromCache()

  return <DomainList domains={domains} />
})
