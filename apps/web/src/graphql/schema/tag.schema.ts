import { gql } from 'apollo-server-micro'
import getTagGraphs from '../repositories/tag/getTagGraphs.cypher'

export const tagSchema = gql`
  type Tag {
    id: ID! @id
    name: String! @unique
    isRoot: Boolean
    parent: Tag @relationship(type: "CHILDREN", direction: IN)
    children: [Tag!]! @relationship(type: "CHILDREN", direction: OUT)
  }

  # should be removed, added as a workaround to fix the build issue
  type TagGraphOptions {
    sort: Int
    limit: Int
  }

  # type TagEdge {
  #   source: ID!
  #   target: ID!
  # }

  # We represent the TagGraph as a root node
  type TagGraph @exclude {
    id: ID!
    name: String!
    descendants: [ID!]!
  }

  type Query {
    tagGraphs: [TagGraph!]!
      @cypher(statement: """${getTagGraphs}""")
  }
`
