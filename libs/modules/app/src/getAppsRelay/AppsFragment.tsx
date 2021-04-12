import graphql from 'babel-plugin-relay/macro'

export const appsFragment = graphql`
  fragment AppsFragment_app on app @relay(plural: true) {
    id
    name
  }
`
