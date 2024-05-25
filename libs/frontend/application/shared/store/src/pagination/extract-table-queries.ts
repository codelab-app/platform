import type { Filterables } from '@codelab/frontend/abstract/application'

export interface TableQueryString {
  [key: string]: string
  page: string
  pageSize: string
}

/**
 * Used with paginationService to extract page, pageSize, and filter properties from the url params
 * @param router NextRouter
 * @param filterTypes key-value pair for the filter properties and their types for parsing from string
 * @returns An object that contains the page, pageSize, and filter object
 */
export const extractTableQueries = <T extends Filterables>(
  query: TableQueryString,
  filterTypes: Partial<
    Record<keyof T, 'boolean' | 'number' | 'string' | 'string[]'>
  > = {},
) => {
  const page = query.page ? parseInt(query.page.toString()) : undefined

  const pageSize = query.pageSize
    ? parseInt(query.pageSize.toString())
    : undefined

  // Url param values are transformed with the types provided in the filterTypes
  const filter = Object.entries(filterTypes).reduce<Partial<T>>(
    (acc, [key, type]) => {
      if (query[key as string]) {
        let value: Array<string> | boolean | number | string | undefined =
          query[key as string]

        if (type === 'number') {
          value = Number(value)
        }

        if (type === 'boolean') {
          value = value === 'true'
        }

        acc[key as keyof T] = value as T[typeof key]
      }

      return acc
    },
    {},
  )

  return {
    filter,
    page,
    pageSize,
  }
}
