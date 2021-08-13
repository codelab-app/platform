import * as v from 'voca'

export const camelToTitleCase = (value: string) =>
  value
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim()

export const toPascalCase = (value: string) =>
  v.chain(value).camelCase().capitalize().value()

export const toCamelCase = (value: string) => v.chain(value).camelCase().value()

export const toKebabCase = (value: string) => v.chain(value).kebabCase().value()

export const pascalCaseToWords = (input: string) =>
  input
    // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
