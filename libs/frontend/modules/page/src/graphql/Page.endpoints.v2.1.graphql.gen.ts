import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
import { PageFragmentDoc } from './Page.fragment.v2.1.graphql.gen'
export type CreatePagesMutationVariables = Types.Exact<{
  input: Array<Types.PageCreateInput> | Types.PageCreateInput
}>

export type CreatePagesMutation = {
  __typename?: 'Mutation'
  createPages: {
    __typename?: 'CreatePagesMutationResponse'
    pages: Array<{
      __typename?: 'Page'
      id: string
      name: string
      app: {
        __typename?: 'App'
        id: string
        rootProviderElement: { __typename?: 'Element'; id: string }
      }
      rootElement: {
        __typename?: 'Element'
        id: string
        name?: string | null | undefined
      }
    }>
  }
}

export type DeletePagesMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.PageWhere>
  delete?: Types.InputMaybe<Types.PageDeleteInput>
}>

export type DeletePagesMutation = {
  __typename?: 'Mutation'
  deletePages: { __typename?: 'DeleteInfo'; nodesDeleted: number }
}

export type UpdatePagesMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.PageWhere>
  update?: Types.InputMaybe<Types.PageUpdateInput>
}>

export type UpdatePagesMutation = {
  __typename?: 'Mutation'
  updatePages: {
    __typename?: 'UpdatePagesMutationResponse'
    pages: Array<{
      __typename?: 'Page'
      id: string
      name: string
      app: {
        __typename?: 'App'
        id: string
        rootProviderElement: { __typename?: 'Element'; id: string }
      }
      rootElement: {
        __typename?: 'Element'
        id: string
        name?: string | null | undefined
      }
    }>
  }
}

export type GetPagesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.PageOptions>
  where?: Types.InputMaybe<Types.PageWhere>
}>

export type GetPagesQuery = {
  __typename?: 'Query'
  pages: Array<{
    __typename?: 'Page'
    id: string
    name: string
    app: {
      __typename?: 'App'
      id: string
      rootProviderElement: { __typename?: 'Element'; id: string }
    }
    rootElement: {
      __typename?: 'Element'
      id: string
      name?: string | null | undefined
    }
  }>
}

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
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action()

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
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
