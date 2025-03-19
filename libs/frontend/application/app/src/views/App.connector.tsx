'use client'

import type { IAppModel } from '@codelab/frontend/abstract/domain'
import type { ReactNode } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

export const AppConnector = observer(
  ({ children, id }: { id: string; children(app: IAppModel): ReactNode }) => {
    const { appDomainService } = useDomainStore()
    const app = appDomainService.apps.get(id)

    console.log('AppConnector', app)

    if (!app) {
      return <Spinner />
    }

    return <>{children(app)}</>
  },
)
