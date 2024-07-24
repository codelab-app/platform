import {
  type DeleteResourcesMutationVariables,
  graphql,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { resourceApi } from './resource.api'

export const deleteResourcesRepository = async (
  variables: DeleteResourcesMutationVariables,
) => await resourceApi.DeleteResources(variables)
