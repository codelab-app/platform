import { gql } from 'apollo-server-micro'

export const fieldSchema = gql`
  type Field {
    id: ID!
    key: String!
    name: String
    description: String
    validationRules: String
    defaultValues: Prop
    fieldType: IBaseType! @relationship(type: "FIELD_TYPE", direction: OUT)
    # API the field belongs to
    api: InterfaceType! @relationship(type: "INTERFACE_FIELD", direction: IN)
  }
`
