import graphql from 'babel-plugin-relay/macro'

export const pageFragment = graphql`
  fragment PageFragment_page on page {
    id
    name
  }
`
