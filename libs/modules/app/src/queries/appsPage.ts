import { graphql } from 'react-relay'

export const AppsPageQuery = graphql`
  query AppsPage_Query {
    app_connection {
      edges {
        node {
          id
          # ...AppItem_app
        }
      }
    }
  }
`
