/* eslint-disable canonical/sort-keys */
import { deepSortKeys } from './deep-sort'

describe('deepSortKeys', () => {
  it('should sort object keys alphabetically', () => {
    const input = { b: 1, a: 2, c: 3 }
    const expected = { a: 2, b: 1, c: 3 }

    expect(deepSortKeys(input)).toEqual(expected)
  })

  it('should sort nested object keys alphabetically', () => {
    const input = { b: 1, a: { z: 4, y: 3 }, c: 2 }
    const expected = { a: { y: 3, z: 4 }, b: 1, c: 2 }

    expect(deepSortKeys(input)).toEqual(expected)
  })

  it('should sort keys in an array of objects', () => {
    const input = [
      { b: 1, a: 2 },
      { d: 4, c: 3 },
    ]

    const expected = [
      { a: 2, b: 1 },
      { c: 3, d: 4 },
    ]

    expect(deepSortKeys(input)).toEqual(expected)
  })

  it('should handle arrays and non-objects', () => {
    const input = [1, 2, 3]
    const expected = [1, 2, 3]

    expect(deepSortKeys(input)).toEqual(expected)

    const input2 = 'string'
    const expected2 = 'string'

    expect(deepSortKeys(input2)).toEqual(expected2)
  })

  it('should sort deeply nested structures', () => {
    const input = {
      b: [
        { z: 1, a: 2 },
        { c: 3, b: 4 },
      ],
      a: { y: { b: 1, a: 2 }, x: 3 },
    }

    const expected = {
      a: { x: 3, y: { a: 2, b: 1 } },
      b: [
        { a: 2, z: 1 },
        { b: 4, c: 3 },
      ],
    }

    expect(deepSortKeys(input)).toEqual(expected)
  })
})
