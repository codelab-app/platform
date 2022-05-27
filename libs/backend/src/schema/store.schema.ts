import { gql } from 'apollo-server-micro'

export const storeSchema = gql`
  type StoreGraph @exclude {
    id: ID!
    descendants: [ID!]!
  }

  type Store {
    id: ID! @id
    name: String!
    state: Prop! @relationship(type: "STORE_STATE", direction: OUT)
    stateApi: InterfaceType!
      @relationship(type: "STORE_STATE_API", direction: OUT)

    parentStore: Store
      @relationship(
        type: "PARENT_OF_STORE"
        properties: "StoreParent"
        direction: IN
      )

    children: [Store!]!
      @relationship(
        type: "PARENT_OF_STORE"
        properties: "StoreParent"
        direction: OUT
      )

    actions: [Action!]! @relationship(type: "STORE_ACTION", direction: OUT)
    resources: [Resource!]!
      @relationship(
        type: "STORE_RESOURCE"
        properties: "StoreResource"
        direction: OUT
      )
  }

  input StoreGraphInput {
    rootId: String!
  }

  type Query {
    storeGraph(input: StoreGraphInput!): StoreGraph!
  }

  interface StoreParent @relationshipProperties {
    storeKey: String!
  }

  interface StoreResource @relationshipProperties {
    resourceKey: String!
  }
`
