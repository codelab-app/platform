import { gql } from 'apollo-server-micro'

export const resourceSchema = gql`
  type Resource {
    id: ID! @id
    name: String!
    data: String!
    atom: Atom! @relationship(type: "RESOURCE_ATOM", direction: OUT)
  }
`
