import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './app.api.graphql.api.gen'
import {
  AppList,
  AppListPreview,
  CreateApps,
  DeleteApps,
  GetAppProduction,
  UpdateApps,
} from './app.api.graphql.web.gen'

export const appApi = getSdk(graphqlClient)

export const appServerActions = {
  AppList,
  AppListPreview,
  CreateApps,
  DeleteApps,
  GetAppProduction,
  UpdateApps,
}
