import type { SearchParamsClientProps } from '@codelab/frontend-abstract-types'

import { graphqlFilterMatches } from '@codelab/frontend-application-shared-store/pagination'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import 'server-only'

export const typeTableQuery = async ({
  filter,
  page,
  pageSize,
  search,
}: SearchParamsClientProps) => {
  const { items: typeFragments, totalCount: count } =
    await typeRepository.findBaseTypes(
      {
        options: {
          limit: pageSize,
          offset: (page - 1) * pageSize,
        },
        where: graphqlFilterMatches(filter, search),
      },
      {
        tags: [CACHE_TAGS.Type.list()],
      },
    )

  // We need to get all the types with their full structure including descendants
  const typesDto = await typeRepository.getAll(
    typeFragments.map((type) => type.id),
    {
      tags: [CACHE_TAGS.Type.list()],
    },
  )

  // Get fields from the interface types
  const fieldsDto = typesDto
    .filter((type) => type.__typename === 'InterfaceType')
    .flatMap((interfaceType) => interfaceType.fields)

  return { count, fieldsDto, typesDto }
}

export const preloadTypeTableQuery = (
  searchParams: SearchParamsClientProps,
) => {
  void typeTableQuery(searchParams)
}
