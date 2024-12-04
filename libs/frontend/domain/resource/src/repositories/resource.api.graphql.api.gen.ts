import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
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

export const getSdk = () => ({
  ResourceList: (variables: ResourceListQueryVariables) =>
    gqlRequest(ResourceListDocument.toString(), variables),
  CreateResources: (variables: CreateResourcesMutationVariables) =>
    gqlRequest(CreateResourcesDocument.toString(), variables),
  UpdateResource: (variables: UpdateResourceMutationVariables) =>
    gqlRequest(UpdateResourceDocument.toString(), variables),
  DeleteResources: (variables: DeleteResourcesMutationVariables) =>
    gqlRequest(DeleteResourcesDocument.toString(), variables),
})
