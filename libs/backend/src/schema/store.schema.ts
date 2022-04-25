import { gql } from 'apollo-server-micro'

export const storeSchema = gql`
  type Action {
    id: ID! @id
    name: String!
    body: String!
    store: Store! @relationship(type: "ACTION_OF_STORE", direction: IN)
  }

  type Store {
    id: ID! @id
    name: String!
    state: InterfaceType! @relationship(type: "STATE_OF_STORE", direction: OUT)
    actions: [Action!]! @relationship(type: "ACTION_OF_STORE", direction: OUT)
    localState: String! @default(value: "{}")
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

    resources: [Resource!]!
      @relationship(
        type: "STORE_RESOURCE"
        properties: "StoreResource"
        direction: OUT
      )

    descendants: [Store!]!
      @cypher(
        statement: """
        CALL apoc.path.subgraphAll(
          this,
          { relationshipFilter: 'PARENT_OF_STORE>' }
        ) YIELD nodes
        UNWIND nodes as descendants
        return descendants
        """
      )
  }

  interface ParentOfStore @relationshipProperties {
    storeKey: String!
  }

  interface StoreResource @relationshipProperties {
    resourceKey: String!
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
