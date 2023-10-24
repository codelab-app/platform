import { gql } from '@apollo/client'
import { __PageKind } from '@codelab/shared/abstract/core'

const pageKindSchema = `enum PageKind {
  ${Object.values(__PageKind).join('\n')}
}`

export const pageSchema = gql`
  ${pageKindSchema}

  type PageAuthGuard {
    id: ID! @unique
    redirect: Redirect! @relationship(type: "AUTH_REDIRECT", direction: OUT)
    page: Page! @relationship(type: "PAGE_AUTH_PROVIDER", direction: IN)
    authGuard: AuthGuard!
      @relationship(type: "AUTH_PROVIDER_GUARD", direction: OUT)
  }

  type Page {
    id: ID! @unique
    # appId-name format to make it unique across apps
    compositeKey: String! @unique
    name: String! @customResolver(requires: "app { id } compositeKey")
    slug: String! @customResolver(requires: "app { id } compositeKey")
    # The root of the elementTree
    rootElement: Element!
      @relationship(type: "ROOT_PAGE_ELEMENT", direction: OUT)
    app: App! @relationship(type: "PAGES", direction: IN)
    store: Store! @relationship(type: "STORE_CONTAINER_NODE", direction: OUT)
    #getServerSideProps: String
    # this is an element on _app page tree inside of which child pages content is rendered
    # default is root "Body" element, but can be changed using dropdown on Page Inspector tab
    pageContentContainer: Element
      @relationship(type: "CHILD_PAGE_CONTAINER_ELEMENT", direction: OUT)
    kind: PageKind!
    # when the app will be deployed - the page will be available on this URL
    url: String!

    authGuard: PageAuthGuard
      @relationship(type: "PAGE_AUTH_PROVIDER", direction: OUT)
  }

  # extend type Page
  #   @authorization(
  #     validate: [{ where: { owner: { node: { id: "$jwt.sub" } } } }]
  #   )
`
