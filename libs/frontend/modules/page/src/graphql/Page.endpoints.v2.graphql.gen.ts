import * as Types from '@codelab/shared/abstract/codegen-v2'

import { PageFragment } from './Page.fragment.v2.graphql.gen'
import { gql } from '@apollo/client'
import { PageFragmentDoc } from './Page.fragment.v2.graphql.gen'
import {
  api,
  GraphqlOperationOptions,
} from '@codelab/frontend/model/infra/redux'
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

export const CreatePagesGql = gql`
  mutation CreatePages($input: [PageCreateInput!]!) {
    createPages(input: $input) {
      pages {
        ...Page
      }
    }
  }
  ${PageFragmentDoc}
`
export const DeletePagesGql = gql`
  mutation DeletePages($where: PageWhere, $delete: PageDeleteInput) {
    deletePages(where: $where, delete: $delete) {
      nodesDeleted
    }
  }
`
export const UpdatePagesGql = gql`
  mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {
    updatePages(where: $where, update: $update) {
      pages {
        ...Page
      }
    }
  }
  ${PageFragmentDoc}
`
export const GetPagesGql = gql`
  query GetPages($options: PageOptions, $where: PageWhere) {
    pages: pages(options: $options, where: $where) {
      ...Page
    }
  }
  ${PageFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreatePages: build.mutation<
      CreatePagesMutation,
      GraphqlOperationOptions<CreatePagesMutationVariables>
    >({
      query: (options) => ({
        document: CreatePagesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    DeletePages: build.mutation<
      DeletePagesMutation,
      GraphqlOperationOptions<DeletePagesMutationVariables> | void | undefined
    >({
      query: (options) => ({
        document: DeletePagesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    UpdatePages: build.mutation<
      UpdatePagesMutation,
      GraphqlOperationOptions<UpdatePagesMutationVariables> | void | undefined
    >({
      query: (options) => ({
        document: UpdatePagesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetPages: build.query<
      GetPagesQuery,
      GraphqlOperationOptions<GetPagesQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetPagesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useCreatePagesMutation,
  useDeletePagesMutation,
  useUpdatePagesMutation,
  useGetPagesQuery,
  useLazyGetPagesQuery,
} = injectedRtkApi
