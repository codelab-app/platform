import { stripBracketsRegex } from './matchers'
import { extractObjectFromString } from './parser'

describe('Matchers', () => {
  const typeString = '{left?: ReactNode, right?: ReactNode}'

  it('should remove braces from an object string', () => {
    const typeStringWithoutBraces = 'left?: ReactNode, right?: ReactNode'
    const results = typeString.match(stripBracketsRegex)
    // const results = typeString.matchAll(stripBracketsRegex)

    expect(results?.[1]).toBe(typeStringWithoutBraces)
  })

  it('should parse an object string', () => {
    const results = extractObjectFromString(typeString)

    expect(results).toEqual({
      left: 'ReactNode',
      right: 'ReactNode',
    })
  })
})
