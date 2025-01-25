'use client'

import { type PageContextParams } from '@codelab/frontend/abstract/types'
import { ComponentsPrimarySidebar } from '@codelab/frontend-application-builder/sections'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

const PrimarySidebar = observer(
  ({ params: { appId, pageId } }: { params: PageContextParams }) => {
    const { pageDomainService } = useDomainStore()
    const page = pageDomainService.pages.get(pageId)

    if (!page) {
      return <Spinner isLoading />
    }

    return <ComponentsPrimarySidebar />
  },
)

export default PrimarySidebar
