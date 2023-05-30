import * as Types from '@codelab/shared/abstract/codegen'

import {
  PageFragment,
  BuilderPageFragment,
} from '../../../../abstract/core/src/domain/page/page.fragment.graphql.gen'
import { ResourceFragment } from '../../../../abstract/core/src/domain/resource/resource.fragment.graphql.gen'
import { PageBuilderAppFragment } from '../../../../abstract/core/src/domain/app/app.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  PageFragmentDoc,
  BuilderPageFragmentDoc,
} from '../../../../abstract/core/src/domain/page/page.fragment.graphql.gen'
import { ResourceFragmentDoc } from '../../../../abstract/core/src/domain/resource/resource.fragment.graphql.gen'
import { PageBuilderAppFragmentDoc } from '../../../../abstract/core/src/domain/app/app.fragment.graphql.gen'
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

export type GetRenderedPageAndCommonAppDataQueryVariables = Types.Exact<{
  appId: Types.Scalars['ID']
  pageName: Types.Scalars['String']
}>

export type GetRenderedPageAndCommonAppDataQuery = {
  apps: Array<PageBuilderAppFragment>
  resources: Array<ResourceFragment>
}

export type GetRenderedPageQueryVariables = Types.Exact<{
  pageId: Types.Scalars['ID']
}>

export type GetRenderedPageQuery = { pages: Array<BuilderPageFragment> }

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
    deletePages(where: $where, delete: $delete) {
      nodesDeleted
    }
  }
`
export const UpdatePagesDocument = gql`
  mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {
    updatePages(where: $where, update: $update) {
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
export const GetRenderedPageAndCommonAppDataDocument = gql`
  query GetRenderedPageAndCommonAppData($appId: ID!, $pageName: String!) {
    apps(where: { id: $appId }) {
      ...PageBuilderApp
    }
    resources {
      ...Resource
    }
  }
  ${PageBuilderAppFragmentDoc}
  ${ResourceFragmentDoc}
`
export const GetRenderedPageDocument = gql`
  query GetRenderedPage($pageId: ID!) {
    pages(where: { id: $pageId }) {
      ...BuilderPage
    }
  }
  ${BuilderPageFragmentDoc}
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
    GetRenderedPageAndCommonAppData(
      variables: GetRenderedPageAndCommonAppDataQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetRenderedPageAndCommonAppDataQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetRenderedPageAndCommonAppDataQuery>(
            GetRenderedPageAndCommonAppDataDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetRenderedPageAndCommonAppData',
        'query',
      )
    },
    GetRenderedPage(
      variables: GetRenderedPageQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
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
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
