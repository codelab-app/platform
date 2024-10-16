'use client'

import {
  ExplorerPaneType,
  type PageContextParams,
} from '@codelab/frontend/abstract/types'
import { BuilderPrimarySidebar } from '@codelab/frontend-application-builder/sections'
import { PagesPrimarySidebar } from '@codelab/frontend-application-page/views'
import { useUrlQueryParams } from '@codelab/frontend-application-shared-store/router'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'

const PrimarySidebar = observer(
  ({ params: { appId, pageId } }: { params: PageContextParams }) => {
    const { pageDomainService } = useDomainStore()
    const page = pageDomainService.pages.get(pageId)
    const { primarySidebarKey } = useUrlQueryParams()

    if (!page) {
      return <Spinner isLoading />
    }

    return <BuilderPrimarySidebar containerNode={page} />
  },
)

export default PrimarySidebar
