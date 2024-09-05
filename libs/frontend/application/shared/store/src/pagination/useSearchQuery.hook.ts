import { type ReadonlyURLSearchParams } from 'next/navigation'

/**
 * We want to transform the url query structure to our `Filterables`
 *
 * Take `?search=foo&filter=field1,field2` and convert it to `{ field1: 'foo', field2: 'foo' }`
 *
 */
export const useSearchQuery = (searchParams: ReadonlyURLSearchParams) => {
  const search = searchParams.get('search')
  const filterQuery = searchParams.get('filter')
  const filter = filterQuery ? filterQuery.split(',') : []

  const filterables = filter.reduce<Record<string, string>>((acc, field) => {
    acc[field] = search || ''

    return acc
  }, {})

  return {
    filter,
    filterables,
    search,
  }
}
