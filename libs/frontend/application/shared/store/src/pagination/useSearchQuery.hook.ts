import type { Filterables } from '@codelab/frontend/abstract/application'
import { type ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'

/**
 * We want to transform the url query structure to our `Filterables`
 *
 * Take `?search=foo&filter=field1,field2` and convert it to `{ field1: 'foo', field2: 'foo' }`
 *
 */
export const useSearchQuery = <T extends Filterables>(
  searchParams: ReadonlyURLSearchParams,
) => {
  const search = searchParams.get('search')
  const filterQuery = searchParams.get('filter')
  const filter = filterQuery ? filterQuery.split(',') : []

  const filterables = filter.reduce<T>((acc, field) => {
    acc[field as keyof T] = (search || '') as T[keyof T]

    return acc
  }, {} as T)

  return {
    filter,
    filterables,
    search,
  }
}
