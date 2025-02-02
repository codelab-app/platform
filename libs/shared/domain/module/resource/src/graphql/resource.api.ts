import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './resource.api.graphql.api.gen'
import {
  CreateResources,
  DeleteResources,
  ResourceList,
  UpdateResources,
} from './resource.api.graphql.web.gen'

export const resourceApi = () => getSdk(graphqlClient)

export const resourceServerActions = {
  CreateResources,
  DeleteResources,
  ResourceList,
  UpdateResources,
}
