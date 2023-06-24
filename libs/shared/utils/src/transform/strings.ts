/**
 * Implementation of camelCaseToTitleCase & PascalCaseToTitleCase are the same, so we give them a common name
 * @param input
 */
export const compoundCaseToTitleCase = (input: string) =>
  input
    // insert a space before all caps
    .replace(/\B([A-Z])\B/g, (str) => ` ${str}`)
    // uppercase the first character
    .replace(/^./, (str) => str.toUpperCase())
    .trim()

// export const toPascalCase = (value: string) =>
//   v.chain(value).camelCase().capitalize().value()

// export const toCamelCase = (value: string) => v.chain(value).camelCase().value()

// export const toTitleCase = (value: string) => v.titleCase(value)

// export const toKebabCase = (value: string) => v.chain(value).kebabCase().value()

export const stripQuotes = (value: string) => value.replace(/['"]/g, '')

export const capitalizeFirstLetter = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

// custom implementation of slugify method because can't rely on voca.slugify.
// there are collisions, for example for strings like "My1 App", "My1app", "My 1 App"
// the same slug is generated "my-1-app" and we can't reverse it back to original string.
// in same time our custom implementation will generate "my1-app", "my1app", "my-1-app"
export const slugify = (value?: string) =>
  value
    ? value
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
    : ''

export const getNameFromSlug = (slug?: string) => {
  return slug ? slug.split('-').map(capitalizeFirstLetter).join(' ') : ''
}

// export const startsWithCapital = (word: string) =>
//   word.charAt(0) === word.charAt(0).toUpperCase()
