import * as Types from '@codelab/shared/abstract/codegen-v2'

import { PropMapBindingFragment } from './Element.fragment.v2.1.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-request'
import { PropMapBindingFragmentDoc } from './Element.fragment.v2.1.graphql.gen'
export type CreatePropMapBindingsMutationVariables = Types.Exact<{
  input:
    | Array<Types.PropMapBindingCreateInput>
    | Types.PropMapBindingCreateInput
}>

export type CreatePropMapBindingsMutation = {
  createPropMapBindings: { propMapBindings: Array<PropMapBindingFragment> }
}

export type UpdatePropMapBindingsMutationVariables = Types.Exact<{
  where: Types.PropMapBindingWhere
  update: Types.PropMapBindingUpdateInput
}>

export type UpdatePropMapBindingsMutation = {
  updatePropMapBindings: { propMapBindings: Array<PropMapBindingFragment> }
}

export type DeletePropMapBindingsMutationVariables = Types.Exact<{
  where: Types.PropMapBindingWhere
}>

export type DeletePropMapBindingsMutation = {
  deletePropMapBindings: { nodesDeleted: number }
}

export type GetPropMapBindingsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.PropMapBindingOptions>
  where?: Types.InputMaybe<Types.PropMapBindingWhere>
}>

export type GetPropMapBindingsQuery = {
  propMapBindings: Array<PropMapBindingFragment>
}

export const CreatePropMapBindingsGql = gql`
  mutation CreatePropMapBindings($input: [PropMapBindingCreateInput!]!) {
    createPropMapBindings(input: $input) {
      propMapBindings {
        ...PropMapBinding
      }
    }
  }
  ${PropMapBindingFragmentDoc}
`
export const UpdatePropMapBindingsGql = gql`
  mutation UpdatePropMapBindings(
    $where: PropMapBindingWhere!
    $update: PropMapBindingUpdateInput!
  ) {
    updatePropMapBindings(where: $where, update: $update) {
      propMapBindings {
        ...PropMapBinding
      }
    }
  }
  ${PropMapBindingFragmentDoc}
`
export const DeletePropMapBindingsGql = gql`
  mutation DeletePropMapBindings($where: PropMapBindingWhere!) {
    deletePropMapBindings(where: $where) {
      nodesDeleted
    }
  }
`
export const GetPropMapBindingsGql = gql`
  query GetPropMapBindings(
    $options: PropMapBindingOptions
    $where: PropMapBindingWhere
  ) {
    propMapBindings(options: $options, where: $where) {
      ...PropMapBinding
    }
  }
  ${PropMapBindingFragmentDoc}
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
    CreatePropMapBindings(
      variables: CreatePropMapBindingsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreatePropMapBindingsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreatePropMapBindingsMutation>(
            CreatePropMapBindingsGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreatePropMapBindings',
        'mutation',
      )
    },
    UpdatePropMapBindings(
      variables: UpdatePropMapBindingsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdatePropMapBindingsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdatePropMapBindingsMutation>(
            UpdatePropMapBindingsGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdatePropMapBindings',
        'mutation',
      )
    },
    DeletePropMapBindings(
      variables: DeletePropMapBindingsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeletePropMapBindingsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeletePropMapBindingsMutation>(
            DeletePropMapBindingsGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeletePropMapBindings',
        'mutation',
      )
    },
    GetPropMapBindings(
      variables?: GetPropMapBindingsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetPropMapBindingsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPropMapBindingsQuery>(
            GetPropMapBindingsGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetPropMapBindings',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
