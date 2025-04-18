import { graphqlClient } from '@codelab/shared-infra-gql-client'

import { getSdk } from './field.api.graphql.api.gen'
import {
  CreateFields,
  DeleteFields,
  GetFields,
  UpdateFields,
} from './field.api.graphql.web.gen'

export const fieldApi = () => getSdk(graphqlClient)

export const fieldServerActions = {
  CreateFields,
  DeleteFields,
  GetFields,
  UpdateFields,
}
