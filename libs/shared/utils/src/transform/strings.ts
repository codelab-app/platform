import * as v from 'voca'

export const camelToTitleCase = (value: string) =>
  value
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim()

export const toPascalCase = (value: string) =>
  v.chain(value).camelCase().capitalize().value()

export const toCamelCase = (value: string) => v.chain(value).camelCase().value()

export const toTitleCase = (value: string) => v.titleCase(value)

export const toKebabCase = (value: string) => v.chain(value).kebabCase().value()

export const stripQuotes = (value: string) => value.replace(/['"]/g, '')

export const pascalCaseToWords = (input: string) =>
  input
    // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, (str) => str.toUpperCase())
    .trim()

export const capitalizeFirstLetter = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

export const startsWithCapital = (word: string) =>
  word.charAt(0) === word.charAt(0).toUpperCase()
