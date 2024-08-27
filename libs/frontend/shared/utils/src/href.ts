import keys from 'lodash/keys'

export const href = ({
  pathname,
  query,
}: {
  pathname: string
  query: Record<string, unknown>
}) =>
  keys(query).reduce(
    (url: string, key: string) => url.replace(`[${key}]`, String(query[key])),
    pathname,
  )
