import { _spacedLowerCase, _splitByCapital } from './strings-helpers'

describe('String transform', () => {
  it('can convert camelCase to space-separated words', () => {
    expect(_spacedLowerCase('camelCase')).toBe('camel case')
    expect(_spacedLowerCase('thisIsATest')).toBe('this is a test')
    expect(_spacedLowerCase('ABC')).toBe('a b c')
    expect(_spacedLowerCase('PascalCase')).toBe('pascal case')
    expect(_spacedLowerCase('kebab-case')).toBe('kebab case')
  })

  it('can split string by capital letters', () => {
    expect(_splitByCapital('camelCase')).toBe('camel Case')
    expect(_splitByCapital('ThisIsATest')).toBe('This Is A Test')
    expect(_splitByCapital('ABC')).toBe('A B C')
    expect(_splitByCapital('alreadyLowercase')).toBe('already Lowercase')
    expect(_splitByCapital('')).toBe('')
  })
})
