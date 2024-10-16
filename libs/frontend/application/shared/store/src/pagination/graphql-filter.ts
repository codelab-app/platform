/**
 * Generates a GraphQL filter object based on the provided search string.
 *
 * @param filter - An array of field names to include in the filter.
 * @param search - The search string to match against the fields.
 * @returns A record of field-value pairs representing the GraphQL filter.
 */
export const graphqlFilterMatches = (filter: Array<string>, search = '') => {
  return filter.reduce<Record<string, string>>((acc, field) => {
    acc[`${field}_MATCHES`] = search ? `(?i).*${search}.*` : '.*'

    return acc
  }, {})
}
