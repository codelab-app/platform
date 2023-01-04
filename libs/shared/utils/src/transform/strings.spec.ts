import { compoundCaseToTitleCase, stripQuotes } from './strings'

describe('String transform', () => {
  it('can strip quotes', () => {
    const actual = `"a", 'b'`
    const expected = `a, b`

    expect(stripQuotes(actual)).toBe(expected)
  })

  it('can transform compound to title case', () => {
    const actual = 'space'
    const expected = 'Space'

    expect(compoundCaseToTitleCase(actual)).toBe(expected)
  })
})
