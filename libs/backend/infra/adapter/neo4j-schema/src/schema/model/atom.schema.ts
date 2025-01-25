import { gql } from '@apollo/client'
import { __AtomType } from '@codelab/shared/abstract/core'

import { authOwnerOrAdmin } from './user.schema'

const atomTypeEnum = `enum AtomType {
  ${Object.values(__AtomType).join('\n')}
}`

export const atomSchema = gql`
  ${atomTypeEnum}

  type Atom implements WithOwner ${authOwnerOrAdmin} @node {
    id: ID!  @settable(onUpdate: false) #@unique
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    type: AtomType! #@unique
    name: String! #@unique
    tags: [Tag!]! @relationship(type: "TAGS_WITH", direction: OUT)
    api: InterfaceType! @relationship(type: "ATOM_API", direction: OUT)
    icon: String
    externalJsSource: String
    externalCssSource: String
    externalSourceType: String 
    requiredParents: [Atom!]!
      @relationship(type: "REQUIRED_PARENTS", direction: OUT)
    suggestedChildren: [Atom!]!
      @relationship(type: "ALLOWED_CHILDREN", direction: OUT)
    elements: [Element!]!
      @relationship(type: "ELEMENT_RENDER_TYPE", direction: IN)
  }
`
