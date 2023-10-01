import { gql } from '@apollo/client'
import { __AtomType } from '@codelab/shared/abstract/core'

const atomTypeEnum = `enum AtomType {
  ${Object.values(__AtomType).join('\n')}
}`

export const atomSchema = gql`
  ${atomTypeEnum}

  type Atom implements WithOwner {
    id: ID! @unique
    owner: User!
    type: AtomType! @unique
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
    elements: [Element!]!
      @relationship(type: "ELEMENT_RENDER_TYPE", direction: IN)
  }

  # extend type Atom
  #   @authorization(
  #     validate: [{ where: { node: { owner: { id: "$jwt.sub" } } } }]
  #   )
`
