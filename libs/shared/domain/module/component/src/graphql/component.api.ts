import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './component.api.graphql.api.gen'
import {
  ComponentList,
  CreateComponents,
  DeleteComponents,
  UpdateComponents,
} from './component.api.graphql.web.gen'

export const componentApi = () => getSdk(graphqlClient)

export const componentServerActions = {
  ComponentList,
  CreateComponents,
  DeleteComponents,
  UpdateComponents,
}
