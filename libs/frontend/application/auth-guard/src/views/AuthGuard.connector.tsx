'use client'

import type {
  IAppModel,
  IAuthGuardModel,
} from '@codelab/frontend/abstract/domain'
import type { ReactNode } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

export const AuthGuardConnector = observer(
  ({
    children,
    id,
  }: {
    id: string
    children(authGuard: IAuthGuardModel): ReactNode
  }) => {
    const { authGuardDomainService } = useDomainStore()
    const authGuard = authGuardDomainService.authGuards.get(id)

    if (!authGuard) {
      return <Spinner />
    }

    return <>{children(authGuard)}</>
  },
)
