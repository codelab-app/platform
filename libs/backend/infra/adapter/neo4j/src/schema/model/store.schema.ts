import { gql } from 'apollo-server-micro'

export const storeSchema = gql`
  type Store {
    id: ID! @id(autogenerate: false)
    name: String!
    app: App @relationship(type: "STORE_OF_APP", direction: OUT)
    api: InterfaceType! @relationship(type: "STORE_STATE_API", direction: OUT)
    actions: [AnyAction!]! @relationship(type: "STORE_ACTION", direction: OUT)
  }
`
