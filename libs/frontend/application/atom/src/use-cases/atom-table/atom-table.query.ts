import type { SearchParamsClientProps } from '@codelab/frontend/abstract/types'

import { graphqlFilterMatches } from '@codelab/frontend-application-shared-store/pagination'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { logTimestampMs } from '@codelab/shared/infra/logging'
import 'server-only'

export const atomTableQuery = async ({
  filter,
  page,
  pageSize,
  search,
}: SearchParamsClientProps) => {
  logTimestampMs('Start atomTableQuery')

  const where = graphqlFilterMatches(filter, search)

  const options = {
    limit: pageSize,
    offset: (Math.max(1, page) - 1) * pageSize,
  }

  console.log(page, Math.max(1, page), pageSize, options)

  const {
    aggregate: { count },
    items: atomsDto,
  } = await atomRepository.find(where, options, {
    tags: [CACHE_TAGS.Atom.list({ options, where }), CACHE_TAGS.Atom.list()],
  })

  // await sleep(5000)

  logTimestampMs('End atomTableQuery')

  const typesDto = atomsDto.map((atom) => atom.api)
  const fieldsDto = atomsDto.flatMap((atom) => atom.api.fields)

  return { atomsDto, count, fieldsDto, typesDto }
}

export const preloadAtomTableQuery = (
  searchParams: SearchParamsClientProps,
) => {
  void atomTableQuery(searchParams)
}
