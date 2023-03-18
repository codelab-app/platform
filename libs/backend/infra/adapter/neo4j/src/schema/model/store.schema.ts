import { gql } from 'apollo-server-micro'

export const storeSchema = gql`
  type Store {
    id: ID! @id(autogenerate: false)
    name: String!
    api: InterfaceType! @relationship(type: "STORE_STATE_API", direction: OUT)
    actions: [AnyAction!]! @relationship(type: "STORE_ACTION", direction: OUT)
  }
`
