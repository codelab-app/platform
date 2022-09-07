import { gql } from 'apollo-server-micro'

export const storeSchema = gql`
  type Store {
    id: ID! @id(autogenerate: false)
    name: String!
    state: Prop! @relationship(type: "STORE_STATE", direction: OUT)
    app: App! @relationship(type: "STORE_OF_APP", direction: OUT)
    stateApi: InterfaceType!
      @relationship(type: "STORE_STATE_API", direction: OUT)
    actions: [AnyAction!]! @relationship(type: "STORE_ACTION", direction: OUT)
  }
`
