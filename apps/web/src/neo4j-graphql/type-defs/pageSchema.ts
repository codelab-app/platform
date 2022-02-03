import { gql } from 'apollo-server-micro'

export const pageSchema = gql`
  type Page {
    id: ID! @id

    name: String!

    rootElement: Element @relationship(type: "ROOT", direction: IN)
    app: App @relationship(type: "PAGES", direction: OUT)

    #createdAt: DateTime! @readonly @timestamp(operations: [CREATE])
    #updatedAt: DateTime @readonly @timestamp(operations: [UPDATE])
  }
`
