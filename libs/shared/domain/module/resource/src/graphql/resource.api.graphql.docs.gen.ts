import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
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

export const UpdateResourcesDocument = graphql(`
  mutation UpdateResources(
    $where: ResourceWhere
    $update: ResourceUpdateInput
  ) {
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
