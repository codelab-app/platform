import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './store.api.graphql.api.gen'

export const storeApi = () => getSdk(graphqlClient)

import {
  CreateStores,
  DeleteStores,
  GetStores,
  UpdateStores,
} from './store.api.graphql.web.gen'

export const storeServerActions = {
  CreateStores,
  DeleteStores,
  GetStores,
  UpdateStores,
}
