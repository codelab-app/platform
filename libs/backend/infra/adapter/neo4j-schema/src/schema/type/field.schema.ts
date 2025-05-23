import { gql } from '@apollo/client'

export const fieldSchema = gql`
  type Field @node {
    id: ID! @settable(onUpdate: false) #@unique
    key: String!
    name: String
    nextSibling: Field @relationship(type: "FIELD_SIBLING", direction: IN)
    prevSibling: Field @relationship(type: "FIELD_SIBLING", direction: OUT)
    description: String
    validationRules: String
    defaultValues: String
    fieldType: IBaseType! @relationship(type: "FIELD_TYPE", direction: OUT)
    # API the field belongs to
    api: InterfaceType! @relationship(type: "INTERFACE_FIELD", direction: IN)
  }
`
