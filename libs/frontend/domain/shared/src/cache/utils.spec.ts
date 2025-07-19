/* eslint-disable perfectionist/sort-objects */
import { SortDirection } from '@codelab/shared-infra-gqlgen'

import type { Option, Where } from './cache-options'

import { createDeterministicTagParams } from './utils'

describe('createDeterministicTagParams', () => {
  it('should handle undefined or null input', () => {
    expect(createDeterministicTagParams(undefined)).toBe('{}')
    expect(createDeterministicTagParams(null)).toBe('null')
  })

  it('should create deterministic output for objects regardless of key order', () => {
    // Simple objects with reversed key order
    const obj1: Option = { offset: 1, limit: 2 }
    const obj2: Option = { limit: 2, offset: 1 }
    // Both objects should produce the same string
    const result1 = createDeterministicTagParams(obj1)
    const result2 = createDeterministicTagParams(obj2)

    expect(result1).toBe(result2)
    expect(result1).toBe('{"limit":"2","offset":"1"}')

    // More complex objects with sort
    const complexObj1: Option = {
      limit: 10,
      offset: 5,
      sort: [{ name: SortDirection.Desc }],
    }

    const complexObj2: Option = {
      limit: 10,
      offset: 5,
      sort: [{ name: SortDirection.Desc }],
    }

    // Complex objects should also produce the same string
    const complexResult1 = createDeterministicTagParams(complexObj1)
    const complexResult2 = createDeterministicTagParams(complexObj2)

    expect(complexResult1).toBe(complexResult2)
  })

  it('should handle Where object with name', () => {
    const whereObj: Where = {
      name: 'test',
    }

    expect(createDeterministicTagParams(whereObj)).toBe('{"name":"test"}')
  })

  it('should handle Option with sort', () => {
    const option: Option = {
      limit: 10,
      sort: [{ name: SortDirection.Desc }],
    }

    // Check for exact string match
    const result = createDeterministicTagParams(option)

    // Nested JSON string needs to be escaped
    expect(result).toBe('{"limit":"10","sort":"[{\\"name\\":\\"DESC\\"}]"}')
  })
})
