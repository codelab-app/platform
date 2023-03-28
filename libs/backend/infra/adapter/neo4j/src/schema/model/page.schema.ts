import { __PageKind } from '@codelab/shared/abstract/core'
import { gql } from 'apollo-server-micro'

const pageKindSchema = `enum PageKind {
  ${Object.values(__PageKind).join('\n')}
}`

export const pageSchema = gql`
  ${pageKindSchema}

  type Page {
    id: ID! @id(autogenerate: false)
    # appId-name format to make it unique across apps
    _compoundName: String! @unique
    name: String! @customResolver(requires: ["id", "_compoundName"])
    slug: String! @customResolver(requires: ["id", "_compoundName"])
    # The root of the elementTree
    rootElement: Element!
      @relationship(type: "ROOT_PAGE_ELEMENT", direction: OUT)
    app: App! @relationship(type: "PAGES", direction: IN)

    store: Store! @relationship(type: "STORE_OF_PAGE", direction: IN)
    #getServerSideProps: String
    # this is an element on _app page tree inside of which child pages content is rendered
    # default is root "Body" element, but can be changed using dropdown on Page Inspector tab
    pageContentContainer: Element
      @relationship(type: "CHILD_PAGE_CONTAINER_ELEMENT", direction: OUT)
    kind: PageKind!
  }

  extend type Page
    @auth(
      rules: [
        {
          operations: [CREATE, UPDATE, DELETE]
          roles: ["User"]
          where: { app: { owner: { auth0Id: "$jwt.sub" } } }
          allow: { app: { owner: { auth0Id: "$jwt.sub" } } }
        }
        { operations: [CREATE, UPDATE, DELETE], roles: ["Admin"] }
      ]
    )
`
