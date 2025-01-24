import { gql } from '@apollo/client'

export const storeSchema = gql`
  type Store @node {
    id: ID! @unique @settable(onUpdate: false)
    name: String!
    api: InterfaceType! @relationship(type: "STORE_STATE_API", direction: OUT)
    actions: [AnyAction!]! @relationship(type: "STORE_ACTION", direction: OUT)
    # container: ContainerNode!
    # @relationship(type: "STORE_CONTAINER_NODE", direction: IN)
  }
`
