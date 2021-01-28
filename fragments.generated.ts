import gql from 'graphql-tag'

export const VertexFragments = gql`
  fragment vertexFragments on Vertex {
    id
    type
  }
`
export const EdgeFragments = gql`
  fragment edgeFragments on Edge {
    id
  }
`
export const GraphFragments = gql`
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
  ${VertexFragments}
  ${EdgeFragments}
`
export const PageFragments = gql`
  fragment pageFragments on Page {
    id
    title
    graphs {
      ...graphFragments
    }
  }
  ${GraphFragments}
`
export const AppFragments = gql`
  fragment appFragments on App {
    id
    title
    pages {
      ...pageFragments
    }
  }
  ${PageFragments}
`
export const UserFragments = gql`
  fragment userFragments on User {
    id
    email
    apps {
      ...appFragments
    }
  }
  ${AppFragments}
`
