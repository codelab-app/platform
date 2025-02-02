'use client'

import { type PageContextParams } from '@codelab/frontend/abstract/types'
import { BuilderPrimarySidebar } from '@codelab/frontend-application-builder/sections'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

const PrimarySidebar = async ({
  params,
}: {
  params: Promise<PageContextParams>
}) => {
  const { pageDomainService } = useDomainStore()
  const { pageId } = await params
  const page = pageDomainService.pages.get(pageId)

  if (!page) {
    return <Spinner isLoading />
  }

  return <BuilderPrimarySidebar containerNode={page} />
}

PrimarySidebar.displayName = 'PrimarySidebar'

export default PrimarySidebar
