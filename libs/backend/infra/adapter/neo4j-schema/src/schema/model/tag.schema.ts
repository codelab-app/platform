import { gql } from '@apollo/client'

export const tagSchema = gql`
  type Tag implements WithOwner @node {
    id: ID! @unique @settable(onUpdate: false)
    name: String! @unique
    parent: Tag @relationship(type: "CHILDREN", direction: IN)
    children: [Tag!]! @relationship(type: "CHILDREN", direction: OUT)
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    atoms: [Atom!]! @relationship(type: "TAGS_WITH", direction: IN)
    # This is a custom resolver
    descendants: [Tag!]! @customResolver(requires: "id")
  }
`
