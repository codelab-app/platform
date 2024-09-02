'use client'

import {
  ExplorerPaneType,
  type PageContextParams,
} from '@codelab/frontend/abstract/types'
import {
  BuilderPrimarySidebar,
  ComponentsPrimarySidebar,
} from '@codelab/frontend-application-builder/sections'
import { PagesPrimarySidebar } from '@codelab/frontend-application-page/views'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const PrimarySidebar = observer(
  ({ params: { appId, pageId } }: { params: PageContextParams }) => {
    const { pageDomainService } = useDomainStore()
    const page = pageDomainService.pages.get(pageId)
    const searchParams = useSearchParams()
    const primarySidebarKey = searchParams.get('primarySidebarKey')

    if (!page) {
      return <Spinner isLoading />
    }

    if (primarySidebarKey === ExplorerPaneType.PageList) {
      return <PagesPrimarySidebar />
    }

    if (primarySidebarKey === ExplorerPaneType.Components) {
      return <ComponentsPrimarySidebar />
    }

    return <BuilderPrimarySidebar containerNode={page} />
  },
)

export default PrimarySidebar
