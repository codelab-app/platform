'use client'

import { useDomainService } from '@codelab/frontend-application-domain/services'
import { DomainList } from '@codelab/frontend-application-domain/use-cases/domain-list'

export const DomainListContainer = () => {
  const domains = useDomainService().getAllFromCache()

  return <DomainList domains={domains} />
}
