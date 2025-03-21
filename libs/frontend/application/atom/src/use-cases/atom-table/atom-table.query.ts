import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'

import { graphqlFilterMatches } from '@codelab/frontend-application-shared-store/pagination'
import { parseSearchParamsPageProps } from '@codelab/frontend-application-shared-store/router'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import 'server-only'

export const atomTableQuery = async (searchParams: SearchParamsPageProps) => {
  const {
    filter = ['name'],
    page = 1,
    pageSize = 20,
    search,
  } = parseSearchParamsPageProps(searchParams)

  const {
    aggregate: { count },
    items: atomsDto,
  } = await atomRepository.find(graphqlFilterMatches(filter, search), {
    limit: pageSize,
    offset: (page - 1) * pageSize,
  })

  const typesDto = atomsDto.map((atom) => atom.api)
  const fieldsDto = atomsDto.flatMap((atom) => atom.api.fields)

  return { atomsDto, count, fieldsDto, typesDto }
}

export const preloadAtomTableQuery = (searchParams: SearchParamsPageProps) => {
  void atomTableQuery(searchParams)
}
