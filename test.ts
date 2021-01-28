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
export const CreatePage = gql`
  mutation CreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      ...pageFragments
    }
  }
  ${PageFragments}
`
