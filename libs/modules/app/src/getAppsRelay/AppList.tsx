import React from 'react'
import { PreloadedQuery, usePreloadedQuery } from 'react-relay'
// import { graphql } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppList_Query } from 'libs/modules/app/src/getAppsRelay/__generated__/AppList_Query.graphql'
// import AppItem from './AppItem'

export const AppListQuery = graphql`
  query AppList_Query {
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

interface AppListProps {
  queryRef: PreloadedQuery<AppList_Query>
}

export const AppList = ({ queryRef }: AppListProps) => {
  const data = usePreloadedQuery(AppListQuery, queryRef)

  // const [queryReference, loadQuery] = useQueryLoader(AppListQuery)

  console.log(data)

  return (
    <div>
      {/* {viewer.apps.edges.map(({ node }: any) => (
        <AppItem key={node.id} app={node} />
      ))} */}
    </div>
  )
}
