export const camelCaseToKebabCase = (word: string) => {
  return word.replace(/([A-Z])/g, '-$1').toLowerCase()
}
