'use client'

import type {
  IAppModel,
  IAuthGuardModel,
} from '@codelab/frontend-abstract-domain'
import type { ReactNode } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { Spinner } from 'libs/frontend/presentation/view/src/components/loader'
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
