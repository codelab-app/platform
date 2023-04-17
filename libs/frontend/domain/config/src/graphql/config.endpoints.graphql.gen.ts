import * as Types from '@codelab/shared/abstract/codegen'

import { ConfigFragment } from '../../../../abstract/core/src/domain/config/config.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { ConfigFragmentDoc } from '../../../../abstract/core/src/domain/config/config.fragment.graphql.gen'
export type GetConfigsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ConfigOptions>
  where?: Types.InputMaybe<Types.ConfigWhere>
}>

export type GetConfigsQuery = { configs: Array<ConfigFragment> }

export type CreateConfigsMutationVariables = Types.Exact<{
  input: Array<Types.ConfigCreateInput> | Types.ConfigCreateInput
}>

export type CreateConfigsMutation = {
  createConfigs: { configs: Array<{ id: string }> }
}

export type UpdateConfigsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ConfigWhere>
  update: Types.ConfigUpdateInput
}>

export type UpdateConfigsMutation = {
  updateConfigs: { configs: Array<{ id: string }> }
}

export type DeleteConfigsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ConfigWhere>
}>

export type DeleteConfigsMutation = { deleteConfigs: { nodesDeleted: number } }

export const GetConfigsDocument = gql`
  query GetConfigs($options: ConfigOptions, $where: ConfigWhere) {
    configs(options: $options, where: $where) {
      ...Config
    }
  }
  ${ConfigFragmentDoc}
`
export const CreateConfigsDocument = gql`
  mutation CreateConfigs($input: [ConfigCreateInput!]!) {
    createConfigs(input: $input) {
      configs {
        id
      }
    }
  }
`
export const UpdateConfigsDocument = gql`
  mutation UpdateConfigs($where: ConfigWhere, $update: ConfigUpdateInput!) {
    updateConfigs(where: $where, update: $update) {
      configs {
        id
      }
    }
  }
`
export const DeleteConfigsDocument = gql`
  mutation DeleteConfigs($where: ConfigWhere) {
    deleteConfigs(where: $where) {
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
    GetConfigs(
      variables?: GetConfigsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetConfigsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetConfigsQuery>(GetConfigsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetConfigs',
        'query',
      )
    },
    CreateConfigs(
      variables: CreateConfigsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateConfigsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateConfigsMutation>(
            CreateConfigsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateConfigs',
        'mutation',
      )
    },
    UpdateConfigs(
      variables: UpdateConfigsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateConfigsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateConfigsMutation>(
            UpdateConfigsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateConfigs',
        'mutation',
      )
    },
    DeleteConfigs(
      variables?: DeleteConfigsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteConfigsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteConfigsMutation>(
            DeleteConfigsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteConfigs',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
