import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import { ResourceFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type ResourceListQueryVariables,
  type CreateResourcesMutationVariables,
  type UpdateResourcesMutationVariables,
  type DeleteResourcesMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  ResourceListDocument,
  CreateResourcesDocument,
  UpdateResourcesDocument,
  DeleteResourcesDocument,
} from './resource.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  ResourceList: (variables: ResourceListQueryVariables) =>
    gqlRequest(client, ResourceListDocument.toString(), variables),
  CreateResources: (variables: CreateResourcesMutationVariables) =>
    gqlRequest(client, CreateResourcesDocument.toString(), variables),
  UpdateResources: (variables: UpdateResourcesMutationVariables) =>
    gqlRequest(client, UpdateResourcesDocument.toString(), variables),
  DeleteResources: (variables: DeleteResourcesMutationVariables) =>
    gqlRequest(client, DeleteResourcesDocument.toString(), variables),
})
