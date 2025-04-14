import { filterEmptyStrings } from './filter-empty-strings'

describe('filterEmptyStrings', () => {
  it('should filter empty strings from arrays', () => {
    const input = ['', 'hello', '', 'world', '']
    const expected = ['hello', 'world']

    expect(filterEmptyStrings(input)).toEqual(expected)
  })

  it('should filter empty strings from nested arrays', () => {
    const input = ['', ['hello', '', 'world'], ['', '']]
    const expected = [['hello', 'world']]

    expect(filterEmptyStrings(input)).toEqual(expected)
  })

  it('should filter empty strings from objects', () => {
    const input = { a: '', b: 'hello', c: '', d: 'world' }
    const expected = { b: 'hello', d: 'world' }

    expect(filterEmptyStrings(input)).toEqual(expected)
  })

  it('should filter empty strings from nested objects', () => {
    const input = { a: '', b: { c: '', d: 'hello' }, e: { f: '' } }
    const expected = { b: { d: 'hello' } }

    expect(filterEmptyStrings(input)).toEqual(expected)
  })

  it('should handle mixed nested structures', () => {
    const input = {
      a: '',
      b: ['', 'hello', { c: '', d: 'world' }],
      e: { f: '', g: ['', ''] },
    }

    const expected = {
      b: ['hello', { d: 'world' }],
      e: { g: [] },
    }

    expect(filterEmptyStrings(input)).toEqual(expected)
  })
})
