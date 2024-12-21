'use client'

import { useDomainService } from '@codelab/frontend-application-domain/services'
import { DomainList } from '@codelab/frontend-application-domain/use-cases/domain-list'
import { observer } from 'mobx-react-lite'

interface DomainListContainerProps {
  appId: string
}

export const DomainListContainer = observer<DomainListContainerProps>(
  ({ appId }) => {
    const domains = useDomainService().getAllFromCache()

    return <DomainList appId={appId} domains={domains} />
  },
)
