const baseRedirectSelectionSet = `
  __typename
  id
  kind
`

export const pageRedirectSelectionSet = `
  ${baseRedirectSelectionSet}
  page {
    id
  }
`

export const urlRedirectSelectionSet = `
  ${baseRedirectSelectionSet}
  url
`

export const redirectSelectionSet = `{
  ... on UrlRedirect {
    ${urlRedirectSelectionSet}
  }
  ... on PageRedirect {
    ${pageRedirectSelectionSet}
  }
}`

export const exportUrlRedirectSelectionSet = `{
  ${baseRedirectSelectionSet}
  url
}`

export const exportPageRedirectSelectionSet = `{
  ${baseRedirectSelectionSet}
  page {
    id
  }
}`
