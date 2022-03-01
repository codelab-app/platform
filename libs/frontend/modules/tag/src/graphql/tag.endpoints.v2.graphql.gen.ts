import * as Types from '@codelab/shared/abstract/codegen-v2'

import { TagFragment } from './Tag.fragment.v2.graphql.gen'
import { TagGraphFragment } from './TagGraph.fragment.v2.graphql.gen'
import { gql } from 'graphql-request'
import { TagFragmentDoc } from './Tag.fragment.v2.graphql.gen'
import { TagGraphFragmentDoc } from './TagGraph.fragment.v2.graphql.gen'
import {
  api,
  GraphqlOperationOptions,
} from '@codelab/frontend/model/infra/redux'
export type CreateTagsMutationVariables = Types.Exact<{
  input: Array<Types.TagCreateInput> | Types.TagCreateInput
}>

export type CreateTagsMutation = { createTags: { tags: Array<TagFragment> } }

export type UpdateTagsMutationVariables = Types.Exact<{
  where: Types.TagWhere
  update: Types.TagUpdateInput
}>

export type UpdateTagsMutation = { updateTags: { tags: Array<TagFragment> } }

export type DeleteTagsMutationVariables = Types.Exact<{
  where: Types.TagWhere
}>

export type DeleteTagsMutation = { deleteTags: { nodesDeleted: number } }

export type GetTagsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.TagOptions>
  where?: Types.InputMaybe<Types.TagWhere>
}>

export type GetTagsQuery = { tags: Array<TagFragment> }

export type GetTagGraphsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetTagGraphsQuery = {
  tagGraphs?: TagGraphFragment | null | undefined
}

export const CreateTagsGql = gql`
  mutation CreateTags($input: [TagCreateInput!]!) {
    createTags(input: $input) {
      tags {
        ...Tag
      }
    }
  }
  ${TagFragmentDoc}
`
export const UpdateTagsGql = gql`
  mutation UpdateTags($where: TagWhere!, $update: TagUpdateInput!) {
    updateTags(where: $where, update: $update) {
      tags {
        ...Tag
      }
    }
  }
  ${TagFragmentDoc}
`
export const DeleteTagsGql = gql`
  mutation DeleteTags($where: TagWhere!) {
    deleteTags(where: $where) {
      nodesDeleted
    }
  }
`
export const GetTagsGql = gql`
  query GetTags($options: TagOptions, $where: TagWhere) {
    tags: tags(options: $options, where: $where) {
      ...Tag
    }
  }
  ${TagFragmentDoc}
`
export const GetTagGraphsGql = gql`
  query GetTagGraphs {
    tagGraphs {
      ...TagGraph
    }
  }
  ${TagGraphFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateTags: build.mutation<
      CreateTagsMutation,
      GraphqlOperationOptions<CreateTagsMutationVariables>
    >({
      query: (options) => ({
        document: CreateTagsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    UpdateTags: build.mutation<
      UpdateTagsMutation,
      GraphqlOperationOptions<UpdateTagsMutationVariables>
    >({
      query: (options) => ({
        document: UpdateTagsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    DeleteTags: build.mutation<
      DeleteTagsMutation,
      GraphqlOperationOptions<DeleteTagsMutationVariables>
    >({
      query: (options) => ({
        document: DeleteTagsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetTags: build.query<
      GetTagsQuery,
      GraphqlOperationOptions<GetTagsQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetTagsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetTagGraphs: build.query<
      GetTagGraphsQuery,
      GraphqlOperationOptions<GetTagGraphsQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetTagGraphsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useCreateTagsMutation,
  useUpdateTagsMutation,
  useDeleteTagsMutation,
  useGetTagsQuery,
  useLazyGetTagsQuery,
  useGetTagGraphsQuery,
  useLazyGetTagGraphsQuery,
} = injectedRtkApi
