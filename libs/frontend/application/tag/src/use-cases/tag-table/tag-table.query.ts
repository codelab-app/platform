import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'

import { graphqlFilterMatches } from '@codelab/frontend-application-shared-store/pagination'
import { parseSearchParamsPageProps } from '@codelab/frontend-application-shared-store/router'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { tagRepository } from '@codelab/frontend-domain-tag/repositories'
import { logTimestampMs } from '@codelab/shared/infra/logging'
import 'server-only'

export const tagTableQuery = async (searchParams: SearchParamsPageProps) => {
  const {
    filter = ['name'],
    page = 1,
    pageSize = 20,
    search,
  } = parseSearchParamsPageProps(searchParams)

  const {
    aggregate: { count },
    items: tagsDto,
  } = await tagRepository.find(
    {
      ...graphqlFilterMatches(filter, search),
      // Root tags have no parent
      parent: undefined,
    },
    {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
    {
      tags: [CACHE_TAGS.Tag.list()],
    },
  )

  return { count, tagsDto }
}

export const preloadTagTableQuery = (searchParams: SearchParamsPageProps) => {
  void tagTableQuery(searchParams)
}
