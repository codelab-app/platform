import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import {
  type CreateResourcesMutationVariables,
  graphql,
  type ResourceCreateInput,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { resourceApi } from './resource.api'

export const createResourcesRepository = async (resource: IResourceModel) => {
  await resourceApi.CreateResources({ input: resource.toCreateInput() })
}
