'use client'

import { DomainsPageHeader } from '@codelab/frontend-application-domain/views'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

export const DomainsPageHeaderContainer = observer(
  ({ appId }: { appId: string }) => {
    const { appDomainService } = useDomainStore()
    const app = appDomainService.app(appId)

    if (!app) {
      return null
    }

    return <DomainsPageHeader app={app} />
  },
)
