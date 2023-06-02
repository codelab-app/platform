import { gql } from '@apollo/client'
import { tagIsRoot } from '../../cypher'

export const tagSchema = gql`
  type Tag {
    id: ID! @id(autogenerate: false)
    name: String! @unique
    # Could have multiple roots, just all different trees
    isRoot: Boolean
      @cypher(statement: """${tagIsRoot}""")
    parent: Tag @relationship(type: "CHILDREN", direction: IN)
    children: [Tag!]! @relationship(type: "CHILDREN", direction: OUT)
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    atoms: [Atom!]! @relationship(type: "TAGS_WITH", direction: IN)

    # This is a custom resolver
    descendants: [Tag!]!
  }

  extend type Tag
    @auth(
      rules: [
        {
          operations: [UPDATE, CREATE, DELETE]
          roles: ["Admin"]
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
        {
          roles: ["User"]
          operations: [UPDATE, CREATE, DELETE]
          where: { owner: { auth0Id: "$jwt.sub" } }
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
      ]
    )
`
