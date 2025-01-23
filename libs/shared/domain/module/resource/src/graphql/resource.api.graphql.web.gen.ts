import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { ResourceFragmentDoc } from '@codelab/shared/infra/gqlgen'

import {
  type ResourceListQueryVariables,
  type CreateResourcesMutationVariables,
  type UpdateResourcesMutationVariables,
  type DeleteResourcesMutationVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  ResourceListDocument,
  CreateResourcesDocument,
  UpdateResourcesDocument,
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

export const UpdateResources = (
  variables: UpdateResourcesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateResourcesDocument.toString(), variables, next)

export const DeleteResources = (
  variables: DeleteResourcesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteResourcesDocument.toString(), variables, next)
