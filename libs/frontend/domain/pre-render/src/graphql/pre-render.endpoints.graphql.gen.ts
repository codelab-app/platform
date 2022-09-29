import * as Types from '@codelab/shared/abstract/codegen'

import { PreRenderFragment } from '../../../../abstract/core/src/domain/pre-render/pre-render.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { PreRenderFragmentDoc } from '../../../../abstract/core/src/domain/pre-render/pre-render.fragment.graphql.gen'
export type CreatePreRendersMutationVariables = Types.Exact<{
  input: Array<Types.PreRenderCreateInput> | Types.PreRenderCreateInput
}>

export type CreatePreRendersMutation = {
  createPreRenders: { preRenders: Array<PreRenderFragment> }
}

export type DeletePreRendersMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.PreRenderWhere>
  delete?: Types.InputMaybe<Types.PreRenderDeleteInput>
}>

export type DeletePreRendersMutation = {
  deletePreRenders: { nodesDeleted: number }
}

export type UpdatePreRendersMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.PreRenderWhere>
  update?: Types.InputMaybe<Types.PreRenderUpdateInput>
}>

export type UpdatePreRendersMutation = {
  updatePreRenders: { preRenders: Array<PreRenderFragment> }
}

export type GetPreRendersQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.PreRenderOptions>
  where?: Types.InputMaybe<Types.PreRenderWhere>
}>

export type GetPreRendersQuery = { preRenders: Array<PreRenderFragment> }

export const CreatePreRendersDocument = gql`
  mutation CreatePreRenders($input: [PreRenderCreateInput!]!) {
    createPreRenders(input: $input) {
      preRenders {
        ...PreRender
      }
    }
  }
  ${PreRenderFragmentDoc}
`
export const DeletePreRendersDocument = gql`
  mutation DeletePreRenders(
    $where: PreRenderWhere
    $delete: PreRenderDeleteInput
  ) {
    deletePreRenders(where: $where, delete: $delete) {
      nodesDeleted
    }
  }
`
export const UpdatePreRendersDocument = gql`
  mutation UpdatePreRenders(
    $where: PreRenderWhere
    $update: PreRenderUpdateInput
  ) {
    updatePreRenders(where: $where, update: $update) {
      preRenders {
        ...PreRender
      }
    }
  }
  ${PreRenderFragmentDoc}
`
export const GetPreRendersDocument = gql`
  query GetPreRenders($options: PreRenderOptions, $where: PreRenderWhere) {
    preRenders(options: $options, where: $where) {
      ...PreRender
    }
  }
  ${PreRenderFragmentDoc}
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
    CreatePreRenders(
      variables: CreatePreRendersMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreatePreRendersMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreatePreRendersMutation>(
            CreatePreRendersDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreatePreRenders',
        'mutation',
      )
    },
    DeletePreRenders(
      variables?: DeletePreRendersMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeletePreRendersMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeletePreRendersMutation>(
            DeletePreRendersDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeletePreRenders',
        'mutation',
      )
    },
    UpdatePreRenders(
      variables?: UpdatePreRendersMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdatePreRendersMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdatePreRendersMutation>(
            UpdatePreRendersDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdatePreRenders',
        'mutation',
      )
    },
    GetPreRenders(
      variables?: GetPreRendersQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetPreRendersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPreRendersQuery>(GetPreRendersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetPreRenders',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
