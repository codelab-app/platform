import type { SearchParamsClientProps } from '@codelab/frontend/abstract/types'

import { graphqlFilterMatches } from '@codelab/frontend-application-shared-store/pagination'
import { parseSearchParams } from '@codelab/frontend-application-shared-store/router'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { tagRepository } from '@codelab/frontend-domain-tag/repositories'
import 'server-only'

export const tagTableQuery = async (searchParams: SearchParamsClientProps) => {
  const {
    filter = ['name'],
    page = 1,
    pageSize = 20,
    search,
  } = parseSearchParams(searchParams)

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

export const preloadTagTableQuery = (searchParams: SearchParamsClientProps) => {
  void tagTableQuery(searchParams)
}
