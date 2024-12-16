import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './element.api.graphql.api.gen'

export const elementApi = () => getSdk(graphqlClient)

import {
  CreateElements,
  DeleteElements,
  ElementList,
  UpdateElements,
} from './element.api.graphql.web.gen'

export const elementServerActions = {
  CreateElements,
  DeleteElements,
  ElementList,
  UpdateElements,
}
