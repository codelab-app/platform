import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'

import { graphqlFilterMatches } from '@codelab/frontend-application-shared-store/pagination'
import { parseSearchParamsPageProps } from '@codelab/frontend-application-shared-store/router'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import { logTimestampMs } from '@codelab/shared/infra/logging'
import 'server-only'

export const typeTableQuery = async (searchParams: SearchParamsPageProps) => {
  const {
    filter = ['name'],
    page = 1,
    pageSize = 20,
    search,
  } = parseSearchParamsPageProps(searchParams)

  logTimestampMs('Start typeTableQuery')

  const { items: typeFragments, totalCount: count } =
    await typeRepository.findBaseTypes({
      options: {
        limit: pageSize,
        offset: (page - 1) * pageSize,
      },
      where: graphqlFilterMatches(filter, search),
    })

  // We need to get all the types with their full structure including descendants
  const types = await typeRepository.getAll(
    typeFragments.map((type) => type.id),
  )

  // Get fields from the interface types
  const fieldsDto = types
    .filter((type) => type.__typename === 'InterfaceType')
    .flatMap((interfaceType) => interfaceType.fields)

  logTimestampMs('End typeTableQuery')

  return { count, fieldsDto, types }
}

export const preloadTypeTableQuery = (searchParams: SearchParamsPageProps) => {
  void typeTableQuery(searchParams)
}
