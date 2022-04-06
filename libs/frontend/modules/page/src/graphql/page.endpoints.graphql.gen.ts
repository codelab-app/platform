import * as Types from '@codelab/shared/abstract/codegen'

import { PageFragment } from './page.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { PageFragmentDoc } from './page.fragment.graphql.gen'
export type CreatePagesMutationVariables = Types.Exact<{
  input: Array<Types.PageCreateInput> | Types.PageCreateInput
}>

export type CreatePagesMutation = {
  createPages: { pages: Array<PageFragment> }
}

export type DeletePagesMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.PageWhere>
  delete?: Types.InputMaybe<Types.PageDeleteInput>
}>

export type DeletePagesMutation = { deletePages: { nodesDeleted: number } }

export type UpdatePagesMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.PageWhere>
  update?: Types.InputMaybe<Types.PageUpdateInput>
}>

export type UpdatePagesMutation = {
  updatePages: { pages: Array<PageFragment> }
}

export type GetPagesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.PageOptions>
  where?: Types.InputMaybe<Types.PageWhere>
}>

export type GetPagesQuery = { pages: Array<PageFragment> }

export const CreatePagesDocument = gql`
  mutation CreatePages($input: [PageCreateInput!]!) {
    createPages(input: $input) {
      pages {
        ...Page
      }
    }
  }
  ${PageFragmentDoc}
`
export const DeletePagesDocument = gql`
  mutation DeletePages($where: PageWhere, $delete: PageDeleteInput) {
    deletePages(where: $where, delete: $delete) {
      nodesDeleted
    }
  }
`
export const UpdatePagesDocument = gql`
  mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {
    updatePages(where: $where, update: $update) {
      pages {
        ...Page
      }
    }
  }
  ${PageFragmentDoc}
`
export const GetPagesDocument = gql`
  query GetPages($options: PageOptions, $where: PageWhere) {
    pages(options: $options, where: $where) {
      ...Page
    }
  }
  ${PageFragmentDoc}
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
    CreatePages(
      variables: CreatePagesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreatePagesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreatePagesMutation>(CreatePagesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreatePages',
        'mutation',
      )
    },
    DeletePages(
      variables?: DeletePagesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeletePagesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeletePagesMutation>(DeletePagesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeletePages',
        'mutation',
      )
    },
    UpdatePages(
      variables?: UpdatePagesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdatePagesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdatePagesMutation>(UpdatePagesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdatePages',
        'mutation',
      )
    },
    GetPages(
      variables?: GetPagesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetPagesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPagesQuery>(GetPagesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetPages',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
