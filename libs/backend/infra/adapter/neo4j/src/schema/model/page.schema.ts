import { gql } from 'apollo-server-micro'

export const pageSchema = gql`
  type Page {
    id: ID! @id(autogenerate: false)
    name: String!
    # format : appId-slug because page slug is unique inside app.
    slug: String! @unique
    rootElement: Element!
      @relationship(type: "ROOT_PAGE_ELEMENT", direction: OUT)
    app: App! @relationship(type: "PAGES", direction: IN)
    getServerSideProps: String
    isProvider: Boolean! @default(value: false)
    # this is an element on _app page tree inside of which child pages content is rendered
    # default is root "Body" element, but can be changed using dropdown on Page Inspector tab
    pageContainerElement: Element
      @relationship(type: "CHILD_PAGE_CONTAINER_ELEMENT", direction: OUT)
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
