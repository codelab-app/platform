import { gql } from 'apollo-server-micro'

export const tagSchema = gql`
  type Tag {
    id: ID! @id
    name: String!
    isRoot: Boolean
    parent: Tag @relationship(type: "Children", direction: IN)
    children: [Tag!] @relationship(type: "Children", direction: OUT)
  }
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD:apps/web/src/graphql/schema/tag.schema.ts

>>>>>>> 2b7d8cea (fix: cleanups and convert element fix)
=======
>>>>>>> 554af699 (feat: use reslovers for elements graph)
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
