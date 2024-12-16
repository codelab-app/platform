import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './resource.api.graphql.api.gen'

export const resourceApi = () => getSdk(graphqlClient)

import {
  CreateResources,
  DeleteResources,
  GetResources,
  UpdateResources,
} from './resource.api.graphql.web.gen'

export const resourceServerActions = {
  CreateResources,
  DeleteResources,
  GetResources,
  UpdateResources,
}
