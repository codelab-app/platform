// import { graphql } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'

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
