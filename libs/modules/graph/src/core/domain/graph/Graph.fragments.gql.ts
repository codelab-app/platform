import { gql } from '@apollo/client'
import { EdgeFragmentsGql } from '../edge/Edge.fragments.gql'
import { VertexFragmentsGql } from '../vertex/Vertex.fragments.gql'

export const GraphFragmentsGql = gql`
  fragment graphFragments on Graph {
    id
    label
    vertices {
      ...vertexFragments
    }
    edges {
      ...edgeFragments
    }
  }
  ${VertexFragmentsGql}
  ${EdgeFragmentsGql}
`
