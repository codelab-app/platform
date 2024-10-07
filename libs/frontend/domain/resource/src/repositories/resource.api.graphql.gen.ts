import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
import { ResourceFragmentDoc } from '@codelab/shared/infra/gql'

export const ResourceListDocument = graphql(`
  query ResourceList($options: ResourceOptions, $where: ResourceWhere) {
    aggregate: resourcesAggregate(where: $where) {
      count
    }
    items: resources(options: $options, where: $where) {
      ...Resource
    }
  }
`)

export const CreateResourcesDocument = graphql(`
  mutation CreateResources($input: [ResourceCreateInput!]!) {
    createResources(input: $input) {
      resources {
        id
      }
    }
  }
`)

export const UpdateResourceDocument = graphql(`
  mutation UpdateResource($where: ResourceWhere, $update: ResourceUpdateInput) {
    updateResources(update: $update, where: $where) {
      resources {
        id
      }
    }
  }
`)

export const DeleteResourcesDocument = graphql(`
  mutation DeleteResources(
    $where: ResourceWhere
    $delete: ResourceDeleteInput
  ) {
    deleteResources(where: $where, delete: $delete) {
      nodesDeleted
    }
  }
`)

import {
  type ResourceListQueryVariables,
  type CreateResourcesMutationVariables,
  type UpdateResourceMutationVariables,
  type DeleteResourcesMutationVariables,
} from '@codelab/shared/infra/gql'

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
