import { graphql } from 'react-relay'

export const appsPageQuery = graphql`
  query appsPage_Query {
    app_connection {
      edges {
        node {
          ...AppItem_app
        }
      }
    }
  }
`
