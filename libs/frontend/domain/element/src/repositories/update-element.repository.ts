import {
  graphql,
  type UpdateElementsMutationVariables,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { elementApi } from './element.api'

export const updateElementsRepository = async (
  variables: UpdateElementsMutationVariables,
) => await elementApi.UpdateElements(variables)
