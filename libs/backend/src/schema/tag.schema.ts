import { gql } from 'apollo-server-micro'
import getTagGraphs from '../repositories/tag/getTagGraphs.cypher'
import tagIsRoot from '../repositories/tag/tagIsRoot.cypher'

export const tagSchema = gql`
  type Tag {
    id: ID! @id
    name: String! @unique
    isRoot: Boolean
      @cypher(statement: """${tagIsRoot}""")
    parent: Tag @relationship(type: "CHILDREN", direction: IN)
    children: [Tag!]! @relationship(type: "CHILDREN", direction: OUT)
  }

  # should be removed, added as a workaround to fix the build issue
  type TagGraphOptions {
    sort: Int
    limit: Int
  }

  # We represent the TagGraph as a root node
  type TagGraph @exclude {
    id: ID!
    name: String!
    descendants: [ID!]!
    isRoot: Boolean!
  }

  type Query {
    tagGraphs: [TagGraph!]!
      @cypher(statement: """${getTagGraphs}""")
  }
`
