import { __AtomType } from '@codelab/shared/abstract/core'
import { gql } from 'apollo-server-micro'

const atomTypeSchema = `enum AtomType {
  ${Object.values(__AtomType).join('\n')}
}`

export const atomSchema = gql`
  ${atomTypeSchema}

  type Atom implements WithOwner {
    id: ID! @id(autogenerate: false)
    owner: User!
    type: AtomType! @unique
    name: String! @unique
    tags: [Tag!]! @relationship(type: "TAGS_WITH", direction: OUT)
    api: InterfaceType! @relationship(type: "ATOM_API", direction: OUT)
    icon: String
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    allowedChildren: [Atom!]!
      @relationship(type: "ALLOWED_CHILDREN", direction: OUT)
  }

  extend type Atom
    @auth(
      rules: [
        {
          operations: [UPDATE, CREATE, DELETE]
          roles: ["User"]
          where: { owner: { auth0Id: "$jwt.sub" } }
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
        {
          operations: [UPDATE, CREATE, DELETE]
          roles: ["Admin"]
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
      ]
    )
`
