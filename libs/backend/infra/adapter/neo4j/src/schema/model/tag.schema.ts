import { gql } from '@apollo/client'
import { tagIsRoot } from '../../cypher'

export const tagSchema = gql`
  type Tag {
    id: ID! @unique
    name: String! @unique
    # Could have multiple roots, just all different trees
    isRoot: Boolean!
      @cypher(statement: """${tagIsRoot} AS tagIsRoot""", columnName: "tagIsRoot")
    parent: Tag @relationship(type: "CHILDREN", direction: IN)
    children: [Tag!]! @relationship(type: "CHILDREN", direction: OUT)
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    atoms: [Atom!]! @relationship(type: "TAGS_WITH", direction: IN)

    # This is a custom resolver
    descendants: [Tag!]!
  }
`
