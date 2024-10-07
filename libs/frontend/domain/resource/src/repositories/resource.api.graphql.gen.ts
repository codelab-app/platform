import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
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
} from './resource.api.documents.graphql.gen'

export const ResourceList = (
  variables: ResourceListQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(ResourceListDocument.toString(), variables, next)

export const CreateResources = (
  variables: CreateResourcesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateResourcesDocument.toString(), variables, next)

export const UpdateResource = (
  variables: UpdateResourceMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateResourceDocument.toString(), variables, next)

export const DeleteResources = (
  variables: DeleteResourcesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteResourcesDocument.toString(), variables, next)
