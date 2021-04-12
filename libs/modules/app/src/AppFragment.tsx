import graphql from 'babel-plugin-relay/macro'

export const appFragment = graphql`
  fragment AppFragment_app on app {
    id
    name
    pages {
      ...PageFragment_page
      id
    }
  }
`
