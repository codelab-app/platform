import { gql } from 'apollo-server-micro'

export const fieldSchema = gql`
  type Field {
    id: ID!
    key: String!
    name: String
    nextSibling: Field @relationship(type: "FIELD_NEXT_SIBLING", direction: IN)
    prevSibling: Field @relationship(type: "FIELD_PREV_SIBLING", direction: OUT)
    description: String
    validationRules: String
    defaultValues: String
    fieldType: IBaseType! @relationship(type: "FIELD_TYPE", direction: OUT)
    # API the field belongs to
    api: InterfaceType! @relationship(type: "INTERFACE_FIELD", direction: IN)
  }
`
