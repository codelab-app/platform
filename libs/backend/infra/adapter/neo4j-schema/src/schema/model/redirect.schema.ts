import { gql } from '@apollo/client'

export const redirectSchema = gql`
  enum RedirectTargetType {
    """
    Redirect to a page in the same app
    """
    Page
    """
    Redirect responsible for fetching data from a resource
    """
    Url
  }

  type Redirect @node {
    id: ID! @settable(onUpdate: false) #@unique
    source: Page!
      @relationship(type: "REDIRECT_FROM_PROTECTED_PAGE", direction: IN)
    targetType: RedirectTargetType!
    # target page should belong to the same app of source page
    # to make sure using the same domain on redirect
    targetPage: Page @relationship(type: "REDIRECT_TO_PAGE", direction: OUT)
    # the second option for redirect is using external url
    targetUrl: String
    # the auth guard to run to tell if we should redirect or not
    authGuard: AuthGuard! @relationship(type: "PAGE_AUTH_GUARD", direction: OUT)
  }
`
