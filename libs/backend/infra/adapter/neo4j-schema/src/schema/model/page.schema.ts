import { gql } from '@apollo/client'
import { __PageKind } from '@codelab/shared/abstract/core'

const pageKindSchema = `enum PageKind {
  ${Object.values(__PageKind).join('\n')}
}`

const allowFullAccessForPageOwner = `
{
  operations: [UPDATE, CREATE, DELETE]
  where: { node: { app: { owner: { auth0Id: "$jwt.sub" } } } }
}`

export const pageSchema = gql`
  ${pageKindSchema}

  type Page @node {
    id: ID! @settable(onUpdate: false) #@unique
    # appId-name format to make it unique across apps
    compositeKey: String! #@unique
    name: String! @customResolver(requires: "app { id } compositeKey")
    slug: String! @customResolver(requires: "app { id } compositeKey")
    # The root of the elementTree
    rootElement: Element!
      @relationship(type: "PAGE_ROOT_ELEMENT", direction: OUT)
    # contains the rootElement, and its descendants
    elements: [Element!]! @customResolver(requires: "id")
    app: App! @relationship(type: "PAGES", direction: IN)
    store: Store! @relationship(type: "STORE_CONTAINER_NODE", direction: OUT)
    #getServerSideProps: String
    # this is an element on _app page tree inside of which child pages content is rendered
    # default is root "Body" element, but can be changed using dropdown on Page Inspector tab
    pageContentContainer: Element
      @relationship(type: "CHILD_PAGE_CONTAINER_ELEMENT", direction: OUT)
    kind: PageKind!
    # To protect a page attach it to a redirect
    redirect: Redirect
      @relationship(type: "REDIRECT_FROM_PROTECTED_PAGE", direction: OUT)
    # when the app will be deployed - the page will be available on this URL
    urlPattern: String!
    dependantTypes: [AnyType!]! @customResolver(requires: "id")
  }
`

// extend type Page
//   @authorization(
//     validate: [
//       ${allowReadAccess}
//       ${allowFullAccessForAdmin}
//       ${allowFullAccessForPageOwner}
//     ]
//   )
