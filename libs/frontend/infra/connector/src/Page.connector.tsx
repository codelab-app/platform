'use client'

import type { IPageModel } from '@codelab/frontend-abstract-domain'
import type { ReactNode } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { Spinner } from '@codelab/frontend-presentation-view/components/loader'
import { observer } from 'mobx-react-lite'

export const PageConnector = observer(
  ({ children, id }: { id: string; children(page: IPageModel): ReactNode }) => {
    const { pageDomainService } = useDomainStore()
    const page = pageDomainService.pages.get(id)

    if (!page) {
      return <Spinner />
    }

    return <>{children(page)}</>
  },
)
