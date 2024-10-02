/* eslint-disable @typescript-eslint/no-var-requires */
import { renderHook } from '@testing-library/react'
import queryString from 'query-string'

describe('useUrlQueryParams', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  test('should return correct values from search params', () => {
    /**
     * https://stackoverflow.com/questions/69573545/mock-imported-function-in-jest
     */
    jest.mock('next/navigation', () => ({
      useSearchParams: jest.fn().mockImplementation(
        () =>
          new URLSearchParams(
            queryString.stringifyUrl({
              query: {
                filter: ['tag1', 'tag2'],
                page: '2',
                pageSize: '10',
                primarySidebarKey: 'sidebar1',
                search: 'searchterm',
              },
              url: '',
            }),
          ),
      ),
    }))

    const { useUrlQueryParams } = require('./useUrlQueryParams.hook')

    const { result } = renderHook(() => useUrlQueryParams())

    expect(result.current.filter).toStrictEqual(['tag1', 'tag2'])
    expect(result.current.page).toBe(2)
    expect(result.current.pageSize).toBe(10)
    expect(result.current.primarySidebarKey).toBe('sidebar1')
    expect(result.current.search).toBe('searchterm')
  })

  test('should handle missing or undefined values', () => {
    jest.mock('next/navigation', () => ({
      useSearchParams: jest
        .fn()
        .mockImplementation(() => new URLSearchParams({})),
    }))

    const { useUrlQueryParams } = require('./useUrlQueryParams.hook')

    const { result } = renderHook(() => useUrlQueryParams())

    expect(result.current.filter).toStrictEqual([])
    expect(() => result.current.page).toThrow()
    expect(() => result.current.pageSize).toThrow()
    expect(result.current.primarySidebarKey).toBeUndefined()
    expect(result.current.search).toBeUndefined()
  })

  // describe('parseUrlQueryParams', () => {
  //   test('should parse string params correctly', () => {
  //     const params = {
  //       filter: 'tag1,tag2',
  //       page: '2',
  //       pageSize: '10',
  //       primarySidebarKey: 'sidebar1',
  //       search: 'searchterm',
  //     }

  //     const result = parseUrlQueryParams(params)

  //     expect(result).toEqual({
  //       filter: ['tag1', 'tag2'],
  //       page: 2,
  //       pageSize: 10,
  //       primarySidebarKey: 'sidebar1',
  //       search: 'searchterm',
  //     })
  //   })

  //   test('should handle empty or undefined values', () => {
  //     const params = {
  //       filter: '',
  //       page: '',
  //       pageSize: '',
  //       primarySidebarKey: undefined,
  //       search: undefined,
  //     }

  //     const result = parseUrlQueryParams(params)

  //     expect(result).toEqual({
  //       filter: undefined,
  //       page: NaN,
  //       pageSize: NaN,
  //       primarySidebarKey: undefined,
  //       search: undefined,
  //     })
  //   })
})
