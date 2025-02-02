import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './prop.api.graphql.api.gen'
import {
  CreateProps,
  DeleteProps,
  GetProps,
  UpdateProps,
} from './prop.api.graphql.web.gen'

export const propApi = () => getSdk(graphqlClient)

export const propServerActions = {
  CreateProps,
  DeleteProps,
  GetProps,
  UpdateProps,
}
