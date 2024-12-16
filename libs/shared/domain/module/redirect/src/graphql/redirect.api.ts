import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './redirect.api.graphql.api.gen'

export const redirectApi = () => getSdk(graphqlClient)

import {
  CreateRedirects,
  DeleteRedirects,
  GetRedirects,
  UpdateRedirects,
} from './redirect.api.graphql.web.gen'

export const redirectServerActions = {
  CreateRedirects,
  DeleteRedirects,
  GetRedirects,
  UpdateRedirects,
}
