import { graphqlClient } from '@codelab/shared-infra-gql-client'

import { getSdk } from './page.api.graphql.api.gen'
import {
  CreatePages,
  DeletePages,
  GetRenderedPage,
  PageList,
  UpdatePages,
} from './page.api.graphql.web.gen'

export const pageApi = () => getSdk(graphqlClient)

export const pageServerActions = {
  CreatePages,
  DeletePages,
  GetRenderedPage,
  PageList,
  UpdatePages,
}
