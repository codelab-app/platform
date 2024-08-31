'use client'

import { BuilderPrimarySidebar } from '@codelab/frontend-application-builder/sections'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'
import React from 'react'

const PrimarySidebar = observer(
  ({ params: { pageId } }: { params: { pageId: string } }) => {
    const { pageDomainService } = useDomainStore()
    const page = pageDomainService.pages.get(pageId)

    if (!page) {
      return <Spinner isLoading />
    }

    return <BuilderPrimarySidebar containerNode={page} />
  },
)

export default PrimarySidebar
