import type { IPropData } from '@codelab/shared/abstract/core'

import { mapDeep } from './map-deep'

describe('mapDeep', () => {
  it('should map a simple object', () => {
    const input: IPropData = { a: 1, b: 2 }

    const result = mapDeep(input, (value) =>
      typeof value === 'number' ? value * 2 : value,
    )

    expect(result).toEqual({ a: 2, b: 4 })
  })

  it('should map a nested object', () => {
    const input: IPropData = { a: 1, b: { c: 2, d: 3 } }

    const result = mapDeep(input, (value) => {
      if (typeof value === 'number') {
        return value * 2
      }

      return value
    })

    expect(result).toEqual({ a: 2, b: { c: 4, d: 6 } })
  })

  it('should map an array', () => {
    const input: IPropData = { arr: [1, 2, 3] }

    const result = mapDeep(input, (value) =>
      Array.isArray(value)
        ? value.map((val) => (typeof val === 'number' ? val * 2 : val))
        : value,
    )

    expect(result).toEqual({ arr: [2, 4, 6] })
  })

  it('should handle mixed types', () => {
    const input: IPropData = { a: 1, b: [2, 3], c: { d: 4 } }

    const result = mapDeep(input, (value) => {
      if (typeof value === 'number') {
        return value * 2
      }

      if (Array.isArray(value)) {
        return value.map((val) => (typeof val === 'number' ? val * 2 : val))
      }

      return value
    })

    expect(result).toEqual({ a: 2, b: [4, 6], c: { d: 8 } })
  })

  it('should use custom key mapper', () => {
    const input: IPropData = { a: 1, b: 2 }

    const result = mapDeep(
      input,
      (value) => (typeof value === 'number' ? value * 2 : value),
      (_, key) => key.toString().toUpperCase(),
    )

    expect(result).toEqual({ A: 2, B: 4 })
  })

  it('should handle empty objects', () => {
    const input: IPropData = {}
    const result = mapDeep(input, (value) => value)

    expect(result).toEqual({})
  })

  it('should handle null values', () => {
    const input: IPropData = { a: null, b: 2 }
    const result = mapDeep(input, (value) => value)

    expect(result).toEqual({ a: null, b: 2 })
  })
})
