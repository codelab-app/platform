'use client'

import type { IDomainModel } from '@codelab/frontend/abstract/domain'
import type { ReactNode } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from 'libs/frontend/presentation/view/src/components/loader'
import { observer } from 'mobx-react-lite'

export const DomainConnector = observer(
  ({
    children,
    id,
  }: {
    id: string
    children(domain: IDomainModel): ReactNode
  }) => {
    const { domainDomainService } = useDomainStore()
    const domain = domainDomainService.domains.get(id)

    if (!domain) {
      return <Spinner />
    }

    return <>{children(domain)}</>
  },
)
