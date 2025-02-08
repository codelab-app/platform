'use client'

import type { PageContextParams } from '@codelab/frontend/abstract/types'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { BuilderPrimarySidebar } from './BuilderPrimarySidebar'

export const PagePrimarySidebar = ({ pageId }: PageContextParams) => {
  const { pageDomainService } = useDomainStore()
  const page = pageDomainService.pages.get(pageId)

  if (!page) {
    return <Spinner isLoading />
  }

  return <BuilderPrimarySidebar containerNode={page} />
}

PagePrimarySidebar.displayName = 'PrimarySidebar'
