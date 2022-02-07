import { gql } from 'apollo-server-micro'

export const tagSchema = gql`
  type Tag {
    id: ID! @id

    name: String!

    isRoot: Boolean

    parent: Tag @relationship(type: "Children", direction: IN)

    children: [Tag] @relationship(type: "Children", direction: OUT)
  }
`
export const tagEdgeSchema = gql`
  type TagEdge {
    source: ID!
    target: ID!
  }
`
