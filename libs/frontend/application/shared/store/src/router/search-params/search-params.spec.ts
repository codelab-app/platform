import queryString from 'query-string'
import { pipe } from 'remeda'

import { parseUrlSearchParams } from './search-params'
import { parseSearchParamsPageProps } from './search-params.server'

describe('Query params', () => {
  describe('can parse valid values', () => {
    const url = queryString.stringifyUrl({
      query: {
        filter: ['tag1', 'tag2'],
        page: '2',
        pageSize: '10',
        search: 'keyword',
      },
      url: '',
    })

    const searchParams = new URLSearchParams(url)

    it('can parse search params from a hook', () => {
      const { filter, page, pageSize, search } =
        parseUrlSearchParams(searchParams)

      expect(filter).toStrictEqual(['tag1', 'tag2'])
      expect(page).toBe('2')
      expect(pageSize).toBe('10')
      expect(search).toBe('keyword')
    })

    it('parses query param from page props', () => {
      const result = pipe(
        searchParams,
        parseUrlSearchParams,
        parseSearchParamsPageProps,
      )

      expect(result.filter).toStrictEqual(['tag1', 'tag2'])
      expect(result.page).toBe(2)
      expect(result.pageSize).toBe(10)
      expect(result.search).toBe('keyword')
    })

    it('can parse single filter value as array', () => {
      const singleFilterUrl = queryString.stringifyUrl({
        query: {
          filter: 'tag',
          page: '1',
          pageSize: '10',
        },
        url: '',
      })

      const singleFilterSearchParams = new URLSearchParams(singleFilterUrl)
      const { filter } = parseUrlSearchParams(singleFilterSearchParams)

      expect(filter).toStrictEqual(['tag'])
    })
  })

  describe('can parse missing keys', () => {
    const partialUrl = queryString.stringifyUrl({
      query: {},
      url: '',
    })

    const partialSearchParams = new URLSearchParams(partialUrl)

    it('parses missing values as undefined', () => {
      const queryParams = parseUrlSearchParams(partialSearchParams)

      expect(queryParams.filter).toStrictEqual([])
      expect(queryParams.page).toBeUndefined()
      expect(queryParams.pageSize).toBeUndefined()
      expect(queryParams.search).toBeUndefined()
    })
  })
})
