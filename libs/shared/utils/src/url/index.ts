import queryString from 'query-string'

export const unsetSearchParam = (key: string) => {
  const searchParams = new URLSearchParams(window.location.search)

  searchParams.delete(key)

  return queryString.stringifyUrl({
    query: Object.fromEntries(searchParams.entries()),
    url: window.location.pathname,
  })
}
