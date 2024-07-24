import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { ResourceFragmentDoc } from '@codelab/frontend/infra/gql'

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
} from '@codelab/frontend/infra/gql'

const ResourceList = (
  variables: ResourceListQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(ResourceListDocument, variables, next)

const CreateResources = (
  variables: CreateResourcesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateResourcesDocument, variables, next)

const UpdateResource = (
  variables: UpdateResourceMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateResourceDocument, variables, next)

const DeleteResources = (
  variables: DeleteResourcesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteResourcesDocument, variables, next)

export const getSdk = () => ({
  ResourceList,
  CreateResources,
  UpdateResource,
  DeleteResources,
})
