import { gql } from 'apollo-server-micro'

export const pageSchema = gql`
  enum PageKind {
    Provider
    InternalServerError
    NotFound
    Regular
  }

  type Page {
    id: ID! @id(autogenerate: false)
    # format : appId-name because page name is unique inside app.
    name: String! @unique
    slug: String! @computed(from: ["name"])
    rootElement: Element!
      @relationship(type: "ROOT_PAGE_ELEMENT", direction: OUT)
    app: App! @relationship(type: "PAGES", direction: IN)
    getServerSideProps: String
    # this is an element on _app page tree inside of which child pages content is rendered
    # default is root "Body" element, but can be changed using dropdown on Page Inspector tab
    pageContainerElement: Element
      @relationship(type: "CHILD_PAGE_CONTAINER_ELEMENT", direction: OUT)
    kind: PageKind!
  }

  extend type Page
    @auth(
      rules: [
        {
          operations: [CREATE, UPDATE]
          roles: ["User"]
          where: { app: { owner: { auth0Id: "$jwt.sub" } } }
          bind: { app: { owner: { auth0Id: "$jwt.sub" } } }
        }
        { operations: [CREATE, UPDATE], roles: ["Admin"] }
      ]
    )
`
