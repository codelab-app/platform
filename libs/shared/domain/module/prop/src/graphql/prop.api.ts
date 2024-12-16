import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './prop.api.graphql.api.gen'

export const propApi = () => getSdk(graphqlClient)

import {
  CreateProps,
  DeleteProps,
  GetProps,
  UpdateProps,
} from './prop.api.graphql.web.gen'

export const propServerActions = {
  CreateProps,
  DeleteProps,
  GetProps,
  UpdateProps,
}
