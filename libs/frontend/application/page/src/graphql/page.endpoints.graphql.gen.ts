import * as Types from '@codelab/shared/abstract/codegen'

import {
  PageFragment,
  PageDevelopmentFragment,
} from '../../../../abstract/domain/src/page/page.fragment.graphql.gen'
import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
import {
  PageFragmentDoc,
  PageDevelopmentFragmentDoc,
} from '../../../../abstract/domain/src/page/page.fragment.graphql.gen'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type CreatePagesMutationVariables = Types.Exact<{
  input: Array<Types.PageCreateInput> | Types.PageCreateInput
}>

export type CreatePagesMutation = {
  createPages: { pages: Array<{ id: string }> }
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
  updatePages: { pages: Array<{ id: string }> }
}

export type GetPagesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.PageOptions>
  where?: Types.InputMaybe<Types.PageWhere>
}>

export type GetPagesQuery = {
  aggregate: { count: number }
  items: Array<PageFragment>
}

export type GetRenderedPageQueryVariables = Types.Exact<{
  pageId: Types.Scalars['ID']['input']
}>

export type GetRenderedPageQuery = { pages: Array<PageDevelopmentFragment> }

export const CreatePagesDocument = gql`
  mutation CreatePages($input: [PageCreateInput!]!) {
    createPages(input: $input) {
      pages {
        id
      }
    }
  }
`
export const DeletePagesDocument = gql`
  mutation DeletePages($where: PageWhere, $delete: PageDeleteInput) {
    deletePages(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`
export const UpdatePagesDocument = gql`
  mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {
    updatePages(update: $update, where: $where) {
      pages {
        id
      }
    }
  }
`
export const GetPagesDocument = gql`
  query GetPages($options: PageOptions, $where: PageWhere) {
    aggregate: pagesAggregate(where: $where) {
      count
    }
    items: pages(options: $options, where: $where) {
      ...Page
    }
  }
  ${PageFragmentDoc}
`
export const GetRenderedPageDocument = gql`
  query GetRenderedPage($pageId: ID!) {
    pages(where: { id: $pageId }) {
      ...PageDevelopment
    }
  }
  ${PageDevelopmentFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    CreatePages(
      variables: CreatePagesMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CreatePagesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreatePagesMutation>(CreatePagesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreatePages',
        'mutation',
        variables,
      )
    },
    DeletePages(
      variables?: DeletePagesMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<DeletePagesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeletePagesMutation>(DeletePagesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeletePages',
        'mutation',
        variables,
      )
    },
    UpdatePages(
      variables?: UpdatePagesMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<UpdatePagesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdatePagesMutation>(UpdatePagesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdatePages',
        'mutation',
        variables,
      )
    },
    GetPages(
      variables?: GetPagesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetPagesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPagesQuery>(GetPagesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetPages',
        'query',
        variables,
      )
    },
    GetRenderedPage(
      variables: GetRenderedPageQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetRenderedPageQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetRenderedPageQuery>(
            GetRenderedPageDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetRenderedPage',
        'query',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
