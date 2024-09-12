import { isSubset } from './subset'

describe('isSubset', () => {
  it('should return true for an empty array', () => {
    expect(isSubset([], ['a', 'b', 'c'])).toBe(true)
  })

  it('should return true when array is a subset of superset', () => {
    expect(isSubset(['a', 'b'], ['a', 'b', 'c', 'd'])).toBe(true)
  })

  it('should return false when array is not a subset of superset', () => {
    expect(isSubset(['a', 'b', 'e'], ['a', 'b', 'c', 'd'])).toBe(false)
  })

  it('should return true when array and superset are identical', () => {
    expect(isSubset(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe(true)
  })

  it('should return false when array is larger than superset', () => {
    expect(isSubset(['a', 'b', 'c', 'd'], ['a', 'b', 'c'])).toBe(false)
  })

  // it('should handle duplicate elements correctly', () => {
  //   expect(isSubset(['a', 'a', 'b'], ['a', 'a', 'b', 'c'])).toBe(true)
  //   expect(isSubset(['a', 'a', 'b'], ['a', 'b', 'c'])).toBe(false)
  // })
})
