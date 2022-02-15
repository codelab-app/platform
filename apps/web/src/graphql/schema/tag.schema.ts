import { gql } from 'apollo-server-micro'

export const tagSchema = gql`
  type Tag {
    id: ID! @id

    name: String!

    isRoot: Boolean

    parent: Tag @relationship(type: "Children", direction: IN)

    children: [Tag] @relationship(type: "Children", direction: OUT)
  }

  # Have ogm generation issue if using type
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

  type TagEdge {
    source: ID!
    target: ID!
  }
`
