import { gql } from '@apollo/client'

export const VertexFragmentsGql = gql`
  fragment vertexFragments on Vertex {
    id
    type
  }
`
