'use client'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { BuilderPrimarySidebar } from './BuilderPrimarySidebar'

interface BuilderPrimarySidebarContainerProps {
  pageId: string
}
export const BuilderPrimarySidebarContainer =
  observer<BuilderPrimarySidebarContainerProps>(({ pageId }) => {
    const { pageDomainService } = useDomainStore()
    /**
     * Page may be not hydrated yet
     */
    const page = pageDomainService.pages.get(pageId)

    if (!page) {
      return <Spinner isLoading />
    }

    return <BuilderPrimarySidebar containerNode={page} />
  })
