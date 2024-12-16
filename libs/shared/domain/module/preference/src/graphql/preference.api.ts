import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './preference.api.graphql.api.gen'

export const preferenceApi = () => getSdk(graphqlClient)

import {
  CreatePreferences,
  DeletePreferences,
  GetPreferences,
  UpdatePreferences,
} from './preference.api.graphql.web.gen'

export const preferenceServerActions = {
  CreatePreferences,
  DeletePreferences,
  GetPreferences,
  UpdatePreferences,
}
