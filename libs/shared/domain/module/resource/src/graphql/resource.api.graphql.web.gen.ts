import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { ResourceFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type ResourceListQueryVariables,
  type CreateResourcesMutationVariables,
  type UpdateResourceMutationVariables,
  type DeleteResourcesMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  ResourceListDocument,
  CreateResourcesDocument,
  UpdateResourceDocument,
  DeleteResourcesDocument,
} from './resource.api.graphql.docs.gen'

export const ResourceList = (
  variables: ResourceListQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(ResourceListDocument.toString(), variables, next)

export const CreateResources = (
  variables: CreateResourcesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateResourcesDocument.toString(), variables, next)

export const UpdateResource = (
  variables: UpdateResourceMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateResourceDocument.toString(), variables, next)

export const DeleteResources = (
  variables: DeleteResourcesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteResourcesDocument.toString(), variables, next)
