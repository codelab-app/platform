import * as Types from '@codelab/frontend/abstract/codegen'

import { TagFragment, TagGraphFragment } from './Tag.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TagFragmentDoc, TagGraphFragmentDoc } from './Tag.fragment.graphql.gen'
import { api, GraphqlOperationOptions } from '@codelab/frontend/model/infra/api'
export type CreateTagMutationVariables = Types.Exact<{
  input: Types.CreateTagInput
}>

export type CreateTagMutation = { createTag: { id: string } }

export type DeleteTagsMutationVariables = Types.Exact<{
  input: Types.DeleteTagsInput
}>

export type DeleteTagsMutation = {
  deleteTags?: Array<TagFragment> | null | undefined
}

export type ExportTagsQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetTagGraphsInput>
}>

export type ExportTagsQuery = { getTagGraphs: TagGraphFragment }

export type GetTagGraphQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetTagGraphQuery = {
  getTagGraph?: TagGraphFragment | null | undefined
}

export type GetTagGraphsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetTagGraphsQuery = { getTagGraphs: TagGraphFragment }

export type GetTagsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetTagsQuery = { getTags: Array<TagFragment> }

export type ImportTagsMutationVariables = Types.Exact<{
  input: Types.ImportTagsInput
}>

export type ImportTagsMutation = { importTags?: void | null | undefined }

export type UpdateTagMutationVariables = Types.Exact<{
  input: Types.UpdateTagInput
}>

export type UpdateTagMutation = { updateTag?: TagFragment | null | undefined }

export const CreateTagGql = gql`
  mutation CreateTag($input: CreateTagInput!) {
    createTag(input: $input) {
      id
    }
  }
`
export const DeleteTagsGql = gql`
  mutation DeleteTags($input: DeleteTagsInput!) {
    deleteTags(input: $input) {
      ...Tag
    }
  }
  ${TagFragmentDoc}
`
export const ExportTagsGql = gql`
  query ExportTags($input: GetTagGraphsInput) {
    getTagGraphs(input: $input) {
      ...TagGraph
    }
  }
  ${TagGraphFragmentDoc}
`
export const GetTagGraphGql = gql`
  query GetTagGraph {
    getTagGraph {
      ...TagGraph
    }
  }
  ${TagGraphFragmentDoc}
`
export const GetTagGraphsGql = gql`
  query GetTagGraphs {
    getTagGraphs {
      ...TagGraph
    }
  }
  ${TagGraphFragmentDoc}
`
export const GetTagsGql = gql`
  query GetTags {
    getTags {
      ...Tag
    }
  }
  ${TagFragmentDoc}
`
export const ImportTagsGql = gql`
  mutation ImportTags($input: ImportTagsInput!) {
    importTags(input: $input)
  }
`
export const UpdateTagGql = gql`
  mutation UpdateTag($input: UpdateTagInput!) {
    updateTag(input: $input) {
      ...Tag
    }
  }
  ${TagFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateTag: build.mutation<
      CreateTagMutation,
      GraphqlOperationOptions<CreateTagMutationVariables>
    >({
      query: (options) => ({
        document: CreateTagGql,
        options: options ?? undefined,
      }),
    }),
    DeleteTags: build.mutation<
      DeleteTagsMutation,
      GraphqlOperationOptions<DeleteTagsMutationVariables>
    >({
      query: (options) => ({
        document: DeleteTagsGql,
        options: options ?? undefined,
      }),
    }),
    ExportTags: build.query<
      ExportTagsQuery,
      GraphqlOperationOptions<ExportTagsQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: ExportTagsGql,
        options: options ?? undefined,
      }),
    }),
    GetTagGraph: build.query<
      GetTagGraphQuery,
      GraphqlOperationOptions<GetTagGraphQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetTagGraphGql,
        options: options ?? undefined,
      }),
    }),
    GetTagGraphs: build.query<
      GetTagGraphsQuery,
      GraphqlOperationOptions<GetTagGraphsQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetTagGraphsGql,
        options: options ?? undefined,
      }),
    }),
    GetTags: build.query<
      GetTagsQuery,
      GraphqlOperationOptions<GetTagsQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetTagsGql,
        options: options ?? undefined,
      }),
    }),
    ImportTags: build.mutation<
      ImportTagsMutation,
      GraphqlOperationOptions<ImportTagsMutationVariables>
    >({
      query: (options) => ({
        document: ImportTagsGql,
        options: options ?? undefined,
      }),
    }),
    UpdateTag: build.mutation<
      UpdateTagMutation,
      GraphqlOperationOptions<UpdateTagMutationVariables>
    >({
      query: (options) => ({
        document: UpdateTagGql,
        options: options ?? undefined,
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useCreateTagMutation,
  useDeleteTagsMutation,
  useExportTagsQuery,
  useLazyExportTagsQuery,
  useGetTagGraphQuery,
  useLazyGetTagGraphQuery,
  useGetTagGraphsQuery,
  useLazyGetTagGraphsQuery,
  useGetTagsQuery,
  useLazyGetTagsQuery,
  useImportTagsMutation,
  useUpdateTagMutation,
} = injectedRtkApi
