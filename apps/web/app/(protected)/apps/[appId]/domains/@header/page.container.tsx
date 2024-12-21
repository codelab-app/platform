'use client'

import { useAppService } from '@codelab/frontend-application-app/services'
import { DomainsPageHeader } from '@codelab/frontend-application-domain/views'
import { observer } from 'mobx-react-lite'

export const DomainsPageHeaderContainer = observer(
  ({ appId }: { appId: string }) => {
    const app = useAppService().getOneFromCache({ id: appId })

    if (!app) {
      return null
    }

    return <DomainsPageHeader app={app} />
  },
)
