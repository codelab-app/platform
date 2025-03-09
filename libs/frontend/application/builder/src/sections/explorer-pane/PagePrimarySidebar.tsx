'use client'

import {
  ExplorerPaneType,
  type PageContextParams,
} from '@codelab/frontend/abstract/types'
import { PagesPrimarySidebar } from '@codelab/frontend-application-page/views'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'
import { ErrorBoundary } from 'react-error-boundary'

import { BuilderPrimarySidebar } from './BuilderPrimarySidebar'

export const PagePrimarySidebar = observer(
  ({
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

    return (
      <ErrorBoundary fallbackRender={() => 'BuilderPrimarySidebar'}>
        <BuilderPrimarySidebar containerNode={page} />
      </ErrorBoundary>
    )
  },
)

PagePrimarySidebar.displayName = 'PrimarySidebar'
