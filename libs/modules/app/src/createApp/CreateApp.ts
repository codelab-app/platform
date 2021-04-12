import graphql from 'babel-plugin-relay/macro'
// import { graphql } from 'react-relay'

export const CreateAppMutation = graphql`
  mutation CreateApp_Mutation($data: app_insert_input!) {
    insert_app_one(object: $data) {
      ...AppFragment_app
    }
  }
`
