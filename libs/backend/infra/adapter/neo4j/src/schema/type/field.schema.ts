import { gql } from 'apollo-server-micro'

const sdl = `
input FieldCreateInput {
  description: String
  id: ID!
  key: String!
  name: String
  validationRules: String
}
`

export const fieldSchema = gql`
  interface Field @relationshipProperties {
    id: ID!
    key: String!
    name: String
    description: String
    validationRules: String
  }

  ${sdl}

  type Mutation {
    upsertField(
      interfaceTypeId: ID!
      fieldTypeId: ID!
      field: FieldCreateInput!
    ): InterfaceType!
  }
`
