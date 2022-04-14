import { gql } from 'apollo-server-micro'

export const commonSchema = gql`
  scalar JSON
  scalar JSONObject

  interface IEdge {
    source: String!
    target: String!
  }

  """
  Simplest implementation of an IEdge with no additional fields
  """
  type Edge implements IEdge {
    source: String!
    target: String!
  }
`
