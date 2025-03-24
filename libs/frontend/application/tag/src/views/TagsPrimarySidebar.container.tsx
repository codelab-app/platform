'use client'
import type { IPaginationSearchParams } from '@codelab/frontend/abstract/application'
import type { IRef } from '@codelab/shared/abstract/core'

import { PageType } from '@codelab/frontend/abstract/application'
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

  const tags = tagsRef
    .map((tagRef) => tagDomainService.tags.get(tagRef.id))
    .filter(isDefined)

  useEffect(() => {
    paginationService.setData(tags, totalItems)
    logTimestampMs('set data')
  }, [tagDomainService.tagsList])

  return <TagsPrimarySidebar searchParams={searchParams} tags={tags} />
})
