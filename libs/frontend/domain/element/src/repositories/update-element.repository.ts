import { type UpdateElementsMutationVariables } from '@codelab/frontend/infra/gql'
import { elementApi } from './element.api'

export const updateElementsRepository = async (
  variables: UpdateElementsMutationVariables,
) => await elementApi.UpdateElements(variables)
