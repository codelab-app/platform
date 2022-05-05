import { gql } from 'apollo-server-micro'

export const pageSchema = gql`
  type Page {
    id: ID! @id(autogenerate: false)
    name: String!
    rootElement: Element!
      @relationship(type: "ROOT_PAGE_ELEMENT", direction: IN)
    app: App! @relationship(type: "PAGES", direction: OUT)
  }

  extend type Page
    @auth(
      rules: [
        {
          operations: [READ, CREATE, UPDATE]
          roles: ["User"]
          where: { app: { owner: { auth0Id: "$jwt.sub" } } }
          bind: { app: { owner: { auth0Id: "$jwt.sub" } } }
        }
        { operations: [READ, CREATE, UPDATE], roles: ["Admin"] }
      ]
    )
`
