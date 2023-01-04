import { parseSeparators } from './parser'

describe('Ant Design Field Parser', () => {
  it('can parse field type', () => {
    const actual = `'error' | 'warning'`
    const expected = ['error', 'warning']

    expect(parseSeparators({ type: actual })).toStrictEqual(expected)
  })
})
