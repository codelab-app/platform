'use client'

import type { IDomainModel } from '@codelab/frontend/abstract/domain'
import type { ReactNode } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

export const DomainsConnector = observer(
  ({ children }: { children(domains: Array<IDomainModel>): ReactNode }) => {
    const { domainDomainService } = useDomainStore()
    const domains = domainDomainService.domainsList

    return <>{children(domains)}</>
  },
)
