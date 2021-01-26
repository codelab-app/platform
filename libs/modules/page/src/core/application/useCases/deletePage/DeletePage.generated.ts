import gql from 'graphql-tag'

export const DeletePageGql = gql`
  mutation DeletePage($input: DeletePageInput!) {
    deletePage(input: $input) {
      title
    }
  }
`
