'use client'

import {
  ExplorerPaneType,
  type PageContextParams,
} from '@codelab/frontend/abstract/types'
import { PagesPrimarySidebar } from '@codelab/frontend-application-page/views'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { BuilderPrimarySidebar } from './BuilderPrimarySidebar'

export const PagePrimarySidebar = ({
  appId,
  pageId,
  type,
}: PageContextParams & { type?: ExplorerPaneType }) => {
  const { pageDomainService } = useDomainStore()
  const page = pageDomainService.pages.get(pageId)

  if (!page) {
    return <Spinner isLoading />
  }

  if (type === ExplorerPaneType.PageList) {
    return <PagesPrimarySidebar appId={appId} pageId={pageId} />
  }

  return <BuilderPrimarySidebar containerNode={page} />
}

PagePrimarySidebar.displayName = 'PrimarySidebar'
