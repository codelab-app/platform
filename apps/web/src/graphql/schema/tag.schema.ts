import { gql } from 'apollo-server-micro'

export const tagSchema = gql`
  type Tag {
    id: ID! @id
    name: String! @unique
    isRoot: Boolean
    parent: Tag @relationship(type: "Children", direction: IN)
    children: [Tag!]! @relationship(type: "Children", direction: OUT)
  }

  # # should be removed, added as a workaround to fix the build issue
  # type TagGraphOptions {
  #   sort: Int
  #   limit: Int
  # }

  type TagEdge {
    source: ID!
    target: ID!
  }

  # # Have ogm generation issue if using type
  type TagGraph @exclude {
    """
    All descendant Elements or Components, at any level
    """
    vertices: [Tag!]!
    """
    All the links connecting the descendant elements/components
    """
    edges: [TagEdge!]!
  }

  type Query {
    tagGraphs: TagGraph!
  }
`
