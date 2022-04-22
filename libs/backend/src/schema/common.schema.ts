import { gql } from 'apollo-server-micro'

export const commonSchema = gql`
  scalar JSON
  scalar JSONObject

  interface IEdge {
    source: String!
    target: String!
  }
`
