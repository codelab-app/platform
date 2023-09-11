import { gql } from '@apollo/client'
import { __AtomType } from '@codelab/shared/abstract/core'

const atomTypeSchema = `enum AtomType {
  ${Object.values(__AtomType).join('\n')}
}`

export const atomSchema = gql`
  ${atomTypeSchema}

  type Atom implements WithOwner {
    id: ID! @unique
    owner: User!
    type: AtomType!
    name: String! @unique
    tags: [Tag!]! @relationship(type: "TAGS_WITH", direction: OUT)
    api: InterfaceType! @relationship(type: "ATOM_API", direction: OUT)
    icon: String
    externalJsSource: String
    externalCssSource: String
    externalSourceType: String @unique
    requiredParents: [Atom!]!
      @relationship(type: "REQUIRED_PARRENTS", direction: OUT)
    suggestedChildren: [Atom!]!
      @relationship(type: "ALLOWED_CHILDREN", direction: OUT)
  }

  extend type Atom
    @authorization(
      validate: [{ where: { node: { owner: { id: "$jwt.sub" } } } }]
    )
`
