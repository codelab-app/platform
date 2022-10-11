import { stripQuotes } from './strings'

describe('String transform', () => {
  it('can strip quotes', () => {
    const actual = `"a", 'b'`
    const expected = `a, b`

    expect(stripQuotes(actual)).toBe(expected)
  })
})
