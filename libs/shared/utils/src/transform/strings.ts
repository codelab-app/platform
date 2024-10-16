/* eslint-disable no-restricted-imports */
import { Case } from 'change-case-all'
import { pipe } from 'remeda'
import _slugify from 'slugify'

import { _spacedLowerCase } from './strings-helpers'

export const stripQuotes = (value: string) => value.replace(/['"]/g, '')

export const capitalizeFirstLetter = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

// custom implementation of slugify method because can't rely on voca.slugify.
// there are collisions, for example for strings like "My1 App", "My1app", "My 1 App"
// the same slug is generated "my-1-app" and we can't reverse it back to original string.
// in same time our custom implementation will generate "my1-app", "my1app", "my-1-app"
export const slugify = (value: string) => {
  return _slugify(value, {
    lower: true,
    // remove: /[*+~.()%'"!:@$^]/g,
    strict: true,
  })
}

export const getNameFromSlug = (str?: string) => {
  return str ? str.split('-').map(capitalizeFirstLetter).join(' ') : ''
}

/**
 * Convert camelCase to kebab-case, but only for keys, not values
 *
 * Example: "fontFamily: 'Gloria Hallelujah'" => "font-family: 'Gloria Hallelujah'"
 */
export const camelCaseToKebabCaseOnlyKeys = (input?: string) =>
  input?.replace(/(\w+)(\s*)(?=:)/g, (match) =>
    match.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`),
  )

/**
 * Transform both `camelCase`, `PascalCase` to title case
 */
export const kebabCase = (input: string) => {
  return pipe(input, _spacedLowerCase, Case.kebab)
}

/**
 * Takes `kebab-case`, `camelCase`, `PascalCase` and transforms it to title case
 */
export const titleCase = (input: string) => {
  return Case.title(Case.sentence(input))
}

/**
 * Creates initials out of a string
 */
export const initials = (words: string) => {
  const spaced = _spacedLowerCase(words)

  return spaced
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}
