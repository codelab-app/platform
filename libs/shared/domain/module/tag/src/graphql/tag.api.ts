import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './tag.api.graphql.api.gen'
import {
  CreateTags,
  DeleteTags,
  GetTags,
  UpdateTags,
} from './tag.api.graphql.web.gen'

export const tagApi = () => getSdk(graphqlClient)

export const tagServerActions = {
  CreateTags,
  DeleteTags,
  GetTags,
  UpdateTags,
}
