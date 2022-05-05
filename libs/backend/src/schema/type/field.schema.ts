import { gql } from 'apollo-server-micro'

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const sdl = require('../../../../../schema.api.graphql')

// const sdlString = sdl.loc.source.body

/**
 * 3 ways of representing GraphQL
 *
 * https://www.apollographql.com/blog/backend/schema-design/three-ways-to-represent-your-graphql-schema/
 *
 * 1. SDL
 * 2. Introspection query result
 * 3. GraphQL.js object
 *
 * We want 2 -> 1
 */

const sdl = `
input FieldCreateInput {
  description: String
  id: ID!
  key: String!
  name: String
}
`

export const fieldSchema = gql`
  interface Field @relationshipProperties {
    id: ID!
    key: String!
    name: String
    description: String
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
