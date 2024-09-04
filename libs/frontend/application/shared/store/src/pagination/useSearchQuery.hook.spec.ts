import type { ReadonlyURLSearchParams } from 'next/navigation'
import { useSearchQuery } from './useSearchQuery.hook'

describe('usePagination', () => {
  it('should return empty filterables when searchParams is empty', () => {
    const searchParams =
      new URLSearchParams() as unknown as ReadonlyURLSearchParams

    const result = useSearchQuery(searchParams)

    expect(result.filterables).toEqual({})
    expect(result.filterFields).toEqual([])
    expect(result.search).toBeNull()
  })

  it('should return filterables with search value', () => {
    const searchParams = new URLSearchParams(
      '?search=foo&filter=field1,field2',
    ) as unknown as ReadonlyURLSearchParams

    const result = useSearchQuery(searchParams)

    expect(result.filterables).toEqual({ field1: 'foo', field2: 'foo' })
    expect(result.filterFields).toEqual(['field1', 'field2'])
    expect(result.search).toBe('foo')
  })

  it('should handle missing filter parameter', () => {
    const searchParams = new URLSearchParams(
      '?search=foo',
    ) as unknown as ReadonlyURLSearchParams

    const result = useSearchQuery(searchParams)

    expect(result.filterables).toEqual({})
    expect(result.filterFields).toEqual([])
    expect(result.search).toBe('foo')
  })

  it('should handle missing search parameter', () => {
    const searchParams = new URLSearchParams(
      '?filter=field1,field2',
    ) as unknown as ReadonlyURLSearchParams

    const result = useSearchQuery(searchParams)

    expect(result.filterables).toEqual({ field1: '', field2: '' })
    expect(result.filterFields).toEqual(['field1', 'field2'])
    expect(result.search).toBeNull()
  })

  it('should handle empty filter parameter', () => {
    const searchParams = new URLSearchParams(
      '?search=foo&filter=',
    ) as unknown as ReadonlyURLSearchParams

    const result = useSearchQuery(searchParams)

    expect(result.filterables).toEqual({})
    expect(result.filterFields).toEqual([])
    expect(result.search).toBe('foo')
  })
})
