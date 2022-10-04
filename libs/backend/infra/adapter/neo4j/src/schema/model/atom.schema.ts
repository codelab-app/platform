import { __AtomType } from '@codelab/shared/abstract/core'
import { gql } from 'apollo-server-micro'

const atomTypeSchema = `enum AtomType {
  ${Object.values(__AtomType).join('\n')}
}`

export const atomSchema = gql`
  ${atomTypeSchema}

  type Atom {
    id: ID! @id(autogenerate: false)
    type: AtomType! @unique
    name: String! @unique
    tags: [Tag!]! @relationship(type: "TAGS_WITH", direction: OUT)
    api: InterfaceType! @relationship(type: "ATOM_API", direction: OUT)
    icon: String
    allowedChildren: [Atom!]!
      @relationship(type: "ALLOWED_CHILDREN", direction: OUT)
  }

  extend type Atom
    @auth(
      rules: [
        { operations: [CREATE, UPDATE, DELETE], roles: ["Admin"] }
        { operations: [CONNECT, DISCONNECT], roles: ["Admin", "User"] }
      ]
    )

  # Can't reuse from Neo4j schema
  type CreateInfo {
    bookmark: String
    nodesCreated: Int!
    relationshipsCreated: Int!
  }
`
