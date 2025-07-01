/**
 * Generates a GraphQL filter object based on the provided search string.
 *
 * @param filter - An array of field names to include in the filter. This is hardcoded via function usage, not passed into the URL
 *
 * @param search - The search string to match against the fields.
 *
 * @returns A record of field-value pairs representing the GraphQL filter.
 */
export const graphqlFilterMatches = (
  filter: string | Array<string>,
  search = '',
) => {
  const fields = Array.isArray(filter) ? filter : [filter]

  return fields.reduce<Record<string, string>>((acc, field) => {
    acc[`${field}_MATCHES`] = search ? `(?i).*${search}.*` : '.*'

    return acc
  }, {})
}
