'use client'
import type {
  IPaginationData,
  IPaginationSearchParams,
} from '@codelab/frontend/abstract/application'
import type { IRef } from '@codelab/shared/abstract/core'

import { RoutePaths } from '@codelab/frontend/abstract/application'
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
  pagination: IPaginationData
}>(({ pagination, searchParams, tagsRef }) => {
  const { tagDomainService } = useDomainStore()

  const tags = tagsRef
    .map((tagRef) => tagDomainService.tags.get(tagRef.id))
    .filter(isDefined)

  return (
    <TagsPrimarySidebar
      pagination={pagination}
      searchParams={searchParams}
      tags={tags}
    />
  )
})
