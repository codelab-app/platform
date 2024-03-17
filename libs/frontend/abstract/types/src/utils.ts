import voca from 'voca'

export type WithStyleProp<T extends object> = T & {
  style?: Record<string, number | string>
}

/**
 * Moved here so we don't get circular dep
 */
export const titleCase = (input: string) => {
  // This regex will insert a space before any uppercase letter that
  // follows a lowercase letter, effectively splitting camelCase and PascalCase words.
  const withSpaces = input.replace(/([a-z])([A-Z])/g, '$1 $2')

  return voca.titleCase(withSpaces)
}
