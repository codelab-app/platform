import { CodelabPage } from '@codelab/frontend/abstract/props'
import { gql, GraphQLClient } from 'graphql-request'
import React from 'react'
import { DemoRenderer } from '../../src/demo/DemoRenderer'

const endpoint = 'http://a8069b052300.ngrok.io/graphql'

const query = gql`
  mutation UpsertUser($input: UpsertUserInput!) {
    upsertUser(input: $input) {
      id
    }
  }
`

const graphQLClient = new GraphQLClient(endpoint, {
  // headers: {
  //   authorization: `Bearer ${access_token}`,
  // },
  timeout: 5000,
})

const DemoPage: CodelabPage = () => {
  return <DemoRenderer />
}

DemoPage.Template = null
DemoPage.MainPane = null
DemoPage.Header = null
DemoPage.SidebarNavigation = null
DemoPage.MetaPane = null

export default DemoPage
