import * as Types from '@codelab/shared/abstract/codegen'





import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  ResourceFragment,
  ResourceFragmentDoc,
} from '../../../../abstract/core/src/domain/resource/resource.fragment.graphql.gen'

export type GetResourcesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ResourceOptions>
  where?: Types.InputMaybe<Types.ResourceWhere>
}>

export interface GetResourcesQuery {
  resources: Array<ResourceFragment>
}

export type CreateResourcesMutationVariables = Types.Exact<{
  input: Array<Types.ResourceCreateInput> | Types.ResourceCreateInput
}>

export interface CreateResourcesMutation {
  createResources: { resources: Array<ResourceFragment> }
}

export type UpdateResourceMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ResourceWhere>
  update?: Types.InputMaybe<Types.ResourceUpdateInput>
}>

export interface UpdateResourceMutation {
  updateResources: { resources: Array<ResourceFragment> }
}

export type DeleteResourcesMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ResourceWhere>
}>

export interface DeleteResourcesMutation {
  deleteResources: { nodesDeleted: number }
}

export const GetResourcesDocument = gql`
  query GetResources($options: ResourceOptions, $where: ResourceWhere) {
    resources(options: $options, where: $where) {
      ...Resource
    }
  }
  ${ResourceFragmentDoc}
`
export const CreateResourcesDocument = gql`
  mutation CreateResources($input: [ResourceCreateInput!]!) {
    createResources(input: $input) {
      resources {
        ...Resource
      }
    }
  }
  ${ResourceFragmentDoc}
`
export const UpdateResourceDocument = gql`
  mutation UpdateResource($where: ResourceWhere, $update: ResourceUpdateInput) {
    updateResources(update: $update, where: $where) {
      resources {
        ...Resource
      }
    }
  }
  ${ResourceFragmentDoc}
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
      requestHeaders?: Dom.RequestInit['headers'],
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
      requestHeaders?: Dom.RequestInit['headers'],
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
      requestHeaders?: Dom.RequestInit['headers'],
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
      requestHeaders?: Dom.RequestInit['headers'],
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
