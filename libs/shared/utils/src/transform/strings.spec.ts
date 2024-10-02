import {
  camelCaseToKebabCaseOnlyKeys,
  capitalizeFirstLetter,
  getNameFromSlug,
  initials,
  kebabCase,
  slugify,
  stripQuotes,
  titleCase,
} from './strings'

describe('String transform', () => {
  it('can strip quotes', () => {
    const actual = '"a", \'b\''
    const expected = 'a, b'

    expect(stripQuotes(actual)).toBe(expected)
  })

  it('can capitalize first letter', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello')
    expect(capitalizeFirstLetter('WORLD')).toBe('WORLD')
    expect(capitalizeFirstLetter('')).toBe('')
  })

  it('can get name from slug', () => {
    expect(getNameFromSlug('my-awesome-slug')).toBe('My Awesome Slug')
    expect(getNameFromSlug('hello-world')).toBe('Hello World')
    expect(getNameFromSlug()).toBe('')
  })

  it('can create initials out of a string', () => {
    expect(initials('John Doe')).toBe('JD')
    expect(initials('Alice Bob Charlie')).toBe('ABC')
    expect(initials('camelCase')).toBe('CC')
    expect(initials('PascalCase')).toBe('PC')
    expect(initials('kebab-case')).toBe('KC')
  })
})

describe('kebabCase', () => {
  it('can convert title case to kebab case', () => {
    expect(kebabCase('My Awesome Variable')).toBe('my-awesome-variable')
    expect(kebabCase('already spaced')).toBe('already-spaced')
  })

  it('can convert PascalCase to kebab case', () => {
    expect(kebabCase('ThisIsATest')).toBe('this-is-a-test')
    expect(kebabCase('PascalCase')).toBe('pascal-case')
  })

  it('can convert camelCase to kebab case', () => {
    expect(kebabCase('camelCase')).toBe('camel-case')
  })

  /**
   * Transform both `camelCase`, `PascalCase` to title case
   */
})

describe('Title case', () => {
  it('can transform kebab-case to title case', () => {
    const actual = 'my-awesome-slug'
    const expected = 'My Awesome Slug'

    expect(titleCase(actual)).toBe(expected)
  })

  it('can transform camelCase to title case', () => {
    const actual = 'myAwesomeVariable'
    const expected = 'My Awesome Variable'

    expect(titleCase(actual)).toBe(expected)
  })

  it('can transform PascalCase to title case', () => {
    const actual = 'ThisIsATest'
    const expected = 'This Is a Test'

    expect(titleCase(actual)).toBe(expected)
  })
})

describe('slugify function', () => {
  it('handles strings with numbers and spaces correctly', () => {
    expect(slugify('My1 App')).toBe('my1-app')
    expect(slugify('My 1 App')).toBe('my-1-app')
  })

  it('separates by pascal case', () => {
    expect(slugify('ToolbarItem')).toBe('toolbar-item')
  })

  it('preserves adjacent alphanumeric characters', () => {
    expect(slugify('My1app')).toBe('my1app')
  })

  it('removes special characters and punctuation', () => {
    expect(slugify('Hello, World!')).toBe('hello-world')
  })

  it('handles leading and trailing spaces', () => {
    expect(slugify(' Trim Me ')).toBe('trim-me')
  })

  it('handles uppercase characters', () => {
    expect(slugify('ALL CAPS')).toBe('all-caps')
  })

  it('handles multiple adjacent spaces', () => {
    expect(slugify('Multiple   Spaces')).toBe('multiple-spaces')
  })

  it('handles empty strings', () => {
    expect(slugify('')).toBe('')
  })

  it('handles strings with only special characters', () => {
    expect(slugify('!@#$%^&*()')).toBe('dollarpercentand')
  })

  it('handles mixed alphanumeric and special characters', () => {
    expect(slugify('100% Pure-Awesomeness!')).toBe(
      '100percent-pure-awesomeness',
    )
  })
})

describe('camelCaseToKebabCaseOnlyKeys', () => {
  it('converts camelCase keys to kebab-case', () => {
    expect(camelCaseToKebabCaseOnlyKeys('myKey: value')).toBe('my-key: value')
    expect(camelCaseToKebabCaseOnlyKeys('anotherKey: test')).toBe(
      'another-key: test',
    )
  })

  it('does not modify non-key parts of the string', () => {
    expect(camelCaseToKebabCaseOnlyKeys('key: someValue withCamelCase')).toBe(
      'key: someValue withCamelCase',
    )
  })

  it('handles multiple keys in a string', () => {
    expect(
      camelCaseToKebabCaseOnlyKeys('firstKey: value, secondKey: anotherValue'),
    ).toBe('first-key: value, second-key: anotherValue')
  })

  it('returns undefined for undefined input', () => {
    expect(camelCaseToKebabCaseOnlyKeys(undefined)).toBeUndefined()
  })

  it('returns empty string for empty input', () => {
    expect(camelCaseToKebabCaseOnlyKeys('')).toBe('')
  })
})
