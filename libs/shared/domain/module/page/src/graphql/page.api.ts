import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './page.api.graphql.api.gen'

export const pageApi = () => getSdk(graphqlClient)

import {
  CreatePages,
  DeletePages,
  GetRenderedPage,
  PageList,
  UpdatePages,
} from './page.api.graphql.web.gen'

export const pageServerActions = {
  CreatePages,
  DeletePages,
  GetRenderedPage,
  PageList,
  UpdatePages,
}
