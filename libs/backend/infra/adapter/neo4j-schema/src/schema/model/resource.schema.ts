import { gql } from '@apollo/client'

export const resourceSchema = gql`
  enum ResourceType {
    GraphQl
    Rest
  }

  type Resource implements WithOwner @node {
    id: ID! @unique @settable(onUpdate: false)
    type: ResourceType!
    name: String!
    config: Prop! @relationship(type: "RESOURCE_CONFIG", direction: OUT)
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
  }
`
