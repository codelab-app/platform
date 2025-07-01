import type { SearchParamsClientProps } from '@codelab/frontend-abstract-types'

import { graphqlFilterMatches } from '@codelab/frontend-application-shared-services/pagination'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { tagRepository } from '@codelab/frontend-domain-tag/repositories'
import 'server-only'

export const tagTableQuery = async ({
  filter,
  page,
  pageSize,
  search,
}: SearchParamsClientProps) => {
  const {
    aggregate: { count },
    items: tagsDto,
  } = await tagRepository.find(
    {
      ...graphqlFilterMatches(filter, search),
      // Query all tags for now
      // parent: null,
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
