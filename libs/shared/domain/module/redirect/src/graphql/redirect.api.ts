import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './redirect.api.graphql.api.gen'
import {
  CreateRedirects,
  DeleteRedirects,
  GetRedirects,
  GetRedirectsPreview,
  UpdateRedirects,
} from './redirect.api.graphql.web.gen'

export const redirectApi = () => getSdk(graphqlClient)

export const redirectServerActions = {
  CreateRedirects,
  DeleteRedirects,
  GetRedirects,
  GetRedirectsPreview,
  UpdateRedirects,
}
