'use client'
import type { IPaginationSearchParams } from '@codelab/frontend/abstract/application'
import type { IRef } from '@codelab/shared/abstract/core'

import { PageType } from '@codelab/frontend/abstract/application'
import { useRedirectPaginationRoute } from '@codelab/frontend-application-shared-store/router'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { logTimestampMs } from '@codelab/shared/infra/logging'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { isDefined } from 'remeda'

import { useTagService } from '../services'
import { TagsPrimarySidebar } from './TagsPrimarySidebar'

export const TagsPrimarySidebarContainer = observer<{
  tagsRef: Array<IRef>
  searchParams: IPaginationSearchParams
  pagination: {
    totalItems: number
  }
}>(({ pagination: { totalItems }, searchParams, tagsRef }) => {
  const { tagDomainService } = useDomainStore()
  const { paginationService } = useTagService()
  const { routerService } = useApplicationStore()

  const tags = tagsRef
    .map((tagRef) => tagDomainService.tags.get(tagRef.id))
    .filter(isDefined)

  const redirect = useRedirectPaginationRoute(searchParams, PageType.Tags())

  const onPageChange = (page: number, pageSize: number) => {
    redirect((params) => {
      params.page = page
      params.pageSize = pageSize
    })

    routerService.setSearchParams({
      ...routerService.searchParams,
      page,
      pageSize,
    })
  }

  useEffect(() => {
    paginationService.setData(tags, totalItems)
    logTimestampMs('set data')
  }, [tagDomainService.tagsList])

  return (
    <TagsPrimarySidebar
      onPageChange={onPageChange}
      searchParams={searchParams}
      tags={tags}
    />
  )
})
