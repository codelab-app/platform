import * as Types from '@codelab/frontend/abstract/codegen'

import { PageBaseFragment } from '../graphql/PageBase.fragment.graphql.gen'
import { PageFullFragment } from '../graphql/PageFull.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { PageBaseFragmentDoc } from '../graphql/PageBase.fragment.graphql.gen'
import { PageFullFragmentDoc } from '../graphql/PageFull.fragment.graphql.gen'
import { api, GraphqlOperationOptions } from '@codelab/frontend/model/infra/api'
export type CreatePageMutationVariables = Types.Exact<{
  input: Types.CreatePageInput
}>

export type CreatePageMutation = { createPage: PageBaseFragment }

export type DeletePageMutationVariables = Types.Exact<{
  input: Types.DeletePageInput
}>

export type DeletePageMutation = { deletePage: PageBaseFragment }

export type GetPageQueryVariables = Types.Exact<{
  input: Types.GetPageInput
}>

export type GetPageQuery = { page?: PageFullFragment | null | undefined }

export type GetPagesQueryVariables = Types.Exact<{
  input: Types.GetPagesInput
}>

export type GetPagesQuery = { pages: Array<PageBaseFragment> }

export type UpdatePageMutationVariables = Types.Exact<{
  input: Types.UpdatePageInput
}>

export type UpdatePageMutation = { updatePage: PageBaseFragment }

export type AppPagesQueryVariables = Types.Exact<{
  input: Types.GetAppInput
}>

export type AppPagesQuery = { app?: AppPages__AppFragment | null | undefined }

export type AppPages__AppFragment = {
  id: string
  name: string
  pages: Array<{ id: string; name: string; rootElementId: string }>
}

export const AppPages__AppFragmentDoc = gql`
  fragment AppPages__App on App {
    id
    name
    pages {
      id
      name
      rootElementId
    }
  }
`
export const CreatePageGql = gql`
  mutation CreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      ...PageBase
    }
  }
  ${PageBaseFragmentDoc}
`
export const DeletePageGql = gql`
  mutation DeletePage($input: DeletePageInput!) {
    deletePage(input: $input) {
      ...PageBase
    }
  }
  ${PageBaseFragmentDoc}
`
export const GetPageGql = gql`
  query GetPage($input: GetPageInput!) {
    page: getPage(input: $input) {
      ...PageFull
    }
  }
  ${PageFullFragmentDoc}
`
export const GetPagesGql = gql`
  query GetPages($input: GetPagesInput!) {
    pages: getPages(input: $input) {
      ...PageBase
    }
  }
  ${PageBaseFragmentDoc}
`
export const UpdatePageGql = gql`
  mutation UpdatePage($input: UpdatePageInput!) {
    updatePage(input: $input) {
      ...PageBase
    }
  }
  ${PageBaseFragmentDoc}
`
export const AppPagesGql = gql`
  query AppPages($input: GetAppInput!) {
    app: getApp(input: $input) {
      ...AppPages__App
    }
  }
  ${AppPages__AppFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreatePage: build.mutation<
      CreatePageMutation,
      GraphqlOperationOptions<CreatePageMutationVariables>
    >({
      query: (options) => ({
        document: CreatePageGql,
        options: options ?? undefined,
      }),
    }),
    DeletePage: build.mutation<
      DeletePageMutation,
      GraphqlOperationOptions<DeletePageMutationVariables>
    >({
      query: (options) => ({
        document: DeletePageGql,
        options: options ?? undefined,
      }),
    }),
    GetPage: build.query<
      GetPageQuery,
      GraphqlOperationOptions<GetPageQueryVariables>
    >({
      query: (options) => ({
        document: GetPageGql,
        options: options ?? undefined,
      }),
    }),
    GetPages: build.query<
      GetPagesQuery,
      GraphqlOperationOptions<GetPagesQueryVariables>
    >({
      query: (options) => ({
        document: GetPagesGql,
        options: options ?? undefined,
      }),
    }),
    UpdatePage: build.mutation<
      UpdatePageMutation,
      GraphqlOperationOptions<UpdatePageMutationVariables>
    >({
      query: (options) => ({
        document: UpdatePageGql,
        options: options ?? undefined,
      }),
    }),
    AppPages: build.query<
      AppPagesQuery,
      GraphqlOperationOptions<AppPagesQueryVariables>
    >({
      query: (options) => ({
        document: AppPagesGql,
        options: options ?? undefined,
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useCreatePageMutation,
  useDeletePageMutation,
  useGetPageQuery,
  useLazyGetPageQuery,
  useGetPagesQuery,
  useLazyGetPagesQuery,
  useUpdatePageMutation,
  useAppPagesQuery,
  useLazyAppPagesQuery,
} = injectedRtkApi
