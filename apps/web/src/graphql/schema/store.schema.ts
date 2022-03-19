import { gql } from 'apollo-server-micro'

export const storeSchema = gql`
  type StateField {
    name: String!
    type: String!
    defaultValue: String!
  }

  type Store {
    id: ID! @id
    name: String!
    state: [StateField!]! @relationship(type: "FIELD_OF_STORE", direction: OUT)
    actions: [String!]

    parentStore: Store
      @relationship(
        type: "PARENT_OF_STORE"
        properties: "ParentOfStore"
        direction: IN
      )

    children: [Store!]!
      @relationship(
        type: "PARENT_OF_STORE"
        properties: "ParentOfStore"
        direction: OUT
      )
  }

  interface ParentOfStore @relationshipProperties {
    storeKey: String!
  }

  type StoreEdge {
    source: ID!
    target: ID!
    storeKey: String!
  }

  type StoreGraph @exclude {
    vertices: [Store!]!
    edges: [StoreEdge!]!
  }

  type Query {
    storesGraphs: StoreGraph!
  }

  type DeleteInfo @exclude {
    bookmark: String
    nodesDeleted: Int!
    relationshipsDeleted: Int!
  }

  type Mutation {
    deleteStoresSubgraph(
      delete: StoreDeleteInput
      where: StoreWhere
    ): DeleteInfo!
  }
`
