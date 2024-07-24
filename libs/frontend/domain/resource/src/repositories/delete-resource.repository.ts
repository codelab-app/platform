import { type DeleteResourcesMutationVariables } from '@codelab/frontend/infra/gql'
import { resourceApi } from './resource.api'

export const deleteResourcesRepository = async (
  variables: DeleteResourcesMutationVariables,
) => await resourceApi.DeleteResources(variables)
