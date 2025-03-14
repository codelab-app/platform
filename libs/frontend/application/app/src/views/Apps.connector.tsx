'use client'

import type { IAppModel } from '@codelab/frontend/abstract/domain'
import type { ReactNode } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

export const AppsConnector = observer(
  ({ children }: { children(apps: Array<IAppModel>): ReactNode }) => {
    const { appDomainService } = useDomainStore()
    const apps = appDomainService.appsList

    return <>{children(apps)}</>
  },
)
