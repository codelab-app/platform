'use client'
import type { IPaginationData } from '@codelab/frontend/abstract/application'
import type {
  PaginationClientProps,
  TreeViewClientProps,
} from '@codelab/frontend/abstract/types'
import type { IRef } from '@codelab/shared/abstract/core'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { isDefined } from 'remeda'

import { TagsPrimarySidebar } from './TagsPrimarySidebar'

export const TagsPrimarySidebarContainer = observer<{
  tagsRef: Array<IRef>
  searchParams: TreeViewClientProps & PaginationClientProps
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
