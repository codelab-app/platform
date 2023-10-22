import * as Types from '@codelab/shared/abstract/codegen'

import { UrlFragment } from '../../../../abstract/domain/src/domain/url/url.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { UrlFragmentDoc } from '../../../../abstract/domain/src/domain/url/url.fragment.graphql.gen'
export type CreateUrlsMutationVariables = Types.Exact<{
  input: Array<Types.UrlCreateInput> | Types.UrlCreateInput
}>

export type CreateUrlsMutation = { createUrls: { urls: Array<{ id: string }> } }

export type UpdateUrlsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.UrlWhere>
  update?: Types.InputMaybe<Types.UrlUpdateInput>
}>

export type UpdateUrlsMutation = { updateUrls: { urls: Array<{ id: string }> } }

export type DeleteUrlsMutationVariables = Types.Exact<{
  where: Types.UrlWhere
}>

export type DeleteUrlsMutation = { deleteUrls: { nodesDeleted: number } }

export type GetUrlsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.UrlOptions>
  where?: Types.InputMaybe<Types.UrlWhere>
}>

export type GetUrlsQuery = {
  aggregate: { count: number }
  items: Array<UrlFragment>
}

export const CreateUrlsDocument = gql`
  mutation CreateUrls($input: [UrlCreateInput!]!) {
    createUrls(input: $input) {
      urls {
        id
      }
    }
  }
`
export const UpdateUrlsDocument = gql`
  mutation UpdateUrls($where: UrlWhere, $update: UrlUpdateInput) {
    updateUrls(update: $update, where: $where) {
      urls {
        id
      }
    }
  }
`
export const DeleteUrlsDocument = gql`
  mutation DeleteUrls($where: UrlWhere!) {
    deleteUrls(where: $where) {
      nodesDeleted
    }
  }
`
export const GetUrlsDocument = gql`
  query GetUrls($options: UrlOptions, $where: UrlWhere) {
    aggregate: urlsAggregate(where: $where) {
      count
    }
    items: urls(options: $options, where: $where) {
      ...Url
    }
  }
  ${UrlFragmentDoc}
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
    CreateUrls(
      variables: CreateUrlsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CreateUrlsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateUrlsMutation>(CreateUrlsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateUrls',
        'mutation',
      )
    },
    UpdateUrls(
      variables?: UpdateUrlsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<UpdateUrlsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateUrlsMutation>(UpdateUrlsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdateUrls',
        'mutation',
      )
    },
    DeleteUrls(
      variables: DeleteUrlsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<DeleteUrlsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteUrlsMutation>(DeleteUrlsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteUrls',
        'mutation',
      )
    },
    GetUrls(
      variables?: GetUrlsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetUrlsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUrlsQuery>(GetUrlsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetUrls',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
