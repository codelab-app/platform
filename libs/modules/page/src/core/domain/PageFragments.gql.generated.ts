import gql from 'graphql-tag'

export const PageFragments = gql`
  fragment pageFragments on Page {
    id
    title
    graphs {
      id
      label
      vertices {
        type
      }
    }
  }
`
