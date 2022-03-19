import * as Types from '@codelab/shared/abstract/codegen-v2'

import { ComponentFragment } from './Component.fragment.v2.1.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-request'
import { ComponentFragmentDoc } from './Component.fragment.v2.1.graphql.gen'
export type CreateComponentsMutationVariables = Types.Exact<{
  input: Array<Types.ComponentCreateInput> | Types.ComponentCreateInput
}>

export type CreateComponentsMutation = {
  createComponents: { components: Array<ComponentFragment> }
}

export type DeleteComponentsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ComponentWhere>
  delete?: Types.InputMaybe<Types.ComponentDeleteInput>
}>

export type DeleteComponentsMutation = {
  deleteComponents: { nodesDeleted: number }
}

export type UpdateComponentsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ComponentWhere>
  update?: Types.InputMaybe<Types.ComponentUpdateInput>
}>

export type UpdateComponentsMutation = {
  updateComponents: { components: Array<ComponentFragment> }
}

export type GetComponentsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ComponentOptions>
  where?: Types.InputMaybe<Types.ComponentWhere>
}>

export type GetComponentsQuery = { components: Array<ComponentFragment> }

export const CreateComponentsGql = gql`
  mutation CreateComponents($input: [ComponentCreateInput!]!) {
    createComponents(input: $input) {
      components {
        ...Component
      }
    }
  }
  ${ComponentFragmentDoc}
`
export const DeleteComponentsGql = gql`
  mutation DeleteComponents(
    $where: ComponentWhere
    $delete: ComponentDeleteInput
  ) {
    deleteComponents(where: $where, delete: $delete) {
      nodesDeleted
    }
  }
`
export const UpdateComponentsGql = gql`
  mutation UpdateComponents(
    $where: ComponentWhere
    $update: ComponentUpdateInput
  ) {
    updateComponents(where: $where, update: $update) {
      components {
        ...Component
      }
    }
  }
  ${ComponentFragmentDoc}
`
export const GetComponentsGql = gql`
  query GetComponents($options: ComponentOptions, $where: ComponentWhere) {
    components(options: $options, where: $where) {
      ...Component
    }
  }
  ${ComponentFragmentDoc}
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
    CreateComponents(
      variables: CreateComponentsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateComponentsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateComponentsMutation>(
            CreateComponentsGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateComponents',
        'mutation',
      )
    },
    DeleteComponents(
      variables?: DeleteComponentsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteComponentsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteComponentsMutation>(
            DeleteComponentsGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteComponents',
        'mutation',
      )
    },
    UpdateComponents(
      variables?: UpdateComponentsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateComponentsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateComponentsMutation>(
            UpdateComponentsGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateComponents',
        'mutation',
      )
    },
    GetComponents(
      variables?: GetComponentsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetComponentsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetComponentsQuery>(GetComponentsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetComponents',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
