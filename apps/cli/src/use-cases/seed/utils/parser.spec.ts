import { parseAntDesignTypeValues } from './parser'

describe('Ant Design Field Parser', () => {
  it('can parse field type', () => {
    const actual = `'error' | 'warning'`
    const expected = ['error', 'warning']

    expect(parseAntDesignTypeValues({ type: actual })).toStrictEqual(expected)
  })
})
