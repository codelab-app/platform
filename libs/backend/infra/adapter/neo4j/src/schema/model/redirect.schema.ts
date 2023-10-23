import { gql } from '@apollo/client'

export const redirectSchema = gql`
  enum RedirectKind {
    """
    Redirect to page inside the same app
    """
    Page

    """
    Redirect to custom Url string
    """
    Url
  }

  interface BaseRedirect {
    id: ID!
    kind: RedirectKind! @settable(onUpdate: false)
  }

  type PageRedirect implements BaseRedirect {
    id: ID!
    kind: RedirectKind! @default(value: Page)
    page: Page! @relationship(type: "REDIRECT_TO_PAGE", direction: OUT)
  }

  type UrlRedirect implements BaseRedirect {
    id: ID!
    kind: RedirectKind! @default(value: Url)
    url: String!
  }

  union Redirect = PageRedirect | UrlRedirect
`
