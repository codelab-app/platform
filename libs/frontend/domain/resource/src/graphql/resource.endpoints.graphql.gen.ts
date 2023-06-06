import * as Types from '@codelab/shared/abstract/codegen'

import { ResourceFragment } from '../../../../abstract/core/src/domain/resource/resource.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { ResourceFragmentDoc } from '../../../../abstract/core/src/domain/resource/resource.fragment.graphql.gen'
export type GetResourcesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ResourceOptions>
  where?: Types.InputMaybe<Types.ResourceWhere>
}>

export type GetResourcesQuery = {
  aggregate: { count: number }
  items: Array<ResourceFragment>
}

export type CreateResourcesMutationVariables = Types.Exact<{
  input: Array<Types.ResourceCreateInput> | Types.ResourceCreateInput
}>

export type CreateResourcesMutation = {
  createResources: { resources: Array<{ id: string }> }
}

export type UpdateResourceMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ResourceWhere>
  update?: Types.InputMaybe<Types.ResourceUpdateInput>
}>

export type UpdateResourceMutation = {
  updateResources: { resources: Array<{ id: string }> }
}

export type DeleteResourcesMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ResourceWhere>
}>

export type DeleteResourcesMutation = {
  deleteResources: { nodesDeleted: number }
}

export const GetResourcesDocument = gql`
  query GetResources($options: ResourceOptions, $where: ResourceWhere) {
    aggregate: resourcesAggregate(where: $where) {
      count
    }
    items: resources(options: $options, where: $where) {
      ...Resource
    }
  }
  ${ResourceFragmentDoc}
`
export const CreateResourcesDocument = gql`
  mutation CreateResources($input: [ResourceCreateInput!]!) {
    createResources(input: $input) {
      resources {
        id
      }
    }
  }
`
export const UpdateResourceDocument = gql`
  mutation UpdateResource($where: ResourceWhere, $update: ResourceUpdateInput) {
    updateResources(update: $update, where: $where) {
      resources {
        id
      }
    }
  }
`
export const DeleteResourcesDocument = gql`
  mutation DeleteResources($where: ResourceWhere) {
    deleteResources(where: $where) {
      nodesDeleted
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    GetResources(
      variables?: GetResourcesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetResourcesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetResourcesQuery>(GetResourcesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetResources',
        'query',
      )
    },
    CreateResources(
      variables: CreateResourcesMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CreateResourcesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateResourcesMutation>(
            CreateResourcesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateResources',
        'mutation',
      )
    },
    UpdateResource(
      variables?: UpdateResourceMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<UpdateResourceMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateResourceMutation>(
            UpdateResourceDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateResource',
        'mutation',
      )
    },
    DeleteResources(
      variables?: DeleteResourcesMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<DeleteResourcesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteResourcesMutation>(
            DeleteResourcesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteResources',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
