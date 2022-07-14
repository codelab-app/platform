import { gql } from 'apollo-server-micro'

export const storeSchema = gql`
  type Store {
    id: ID! @id(autogenerate: false)
    name: String!
    state: Prop! @relationship(type: "STORE_STATE", direction: OUT)
    stateApi: InterfaceType!
      @relationship(type: "STORE_STATE_API", direction: OUT)
    actions: [ActionBase!]! @relationship(type: "STORE_ACTION", direction: OUT)
  }
`
