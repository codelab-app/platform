import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'

import { CACHE_TAGS } from '@codelab/frontend-application-shared-store/cache'
import { graphqlFilterMatches } from '@codelab/frontend-application-shared-store/pagination'
import { parseSearchParamsPageProps } from '@codelab/frontend-application-shared-store/router'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { logTimestampMs } from '@codelab/shared/infra/logging'
import 'server-only'

export const atomTableQuery = async (searchParams: SearchParamsPageProps) => {
  const {
    filter = ['name'],
    page = 1,
    pageSize = 20,
    search,
  } = parseSearchParamsPageProps(searchParams)

  logTimestampMs('Start atomTableQuery')

  const where = graphqlFilterMatches(filter, search)

  const options = {
    limit: pageSize,
    offset: (page - 1) * pageSize,
  }

  const {
    aggregate: { count },
    items: atomsDto,
  } = await atomRepository.find(where, options, {
    tags: [CACHE_TAGS.AtomList({ options, where })],
  })

  logTimestampMs('End atomTableQuery')

  const typesDto = atomsDto.map((atom) => atom.api)
  const fieldsDto = atomsDto.flatMap((atom) => atom.api.fields)

  return { atomsDto, count, fieldsDto, typesDto }
}

export const preloadAtomTableQuery = (searchParams: SearchParamsPageProps) => {
  void atomTableQuery(searchParams)
}
