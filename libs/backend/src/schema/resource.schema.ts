import { gql } from 'apollo-server-micro'

export const resourceSchema = gql`
  type Resource {
    id: ID! @id
    name: String!
    data: String! @default(value: "{}")
    api: InterfaceType! @relationship(type: "RESOURCE_API", direction: OUT)
  }

  type Operation {
    id: ID! @id
    name: String!
    resource: Resource! @relationship(type: "QUERY_RESOURCE", direction: OUT)
    data: String! @default(value: "{}")
  }
`
