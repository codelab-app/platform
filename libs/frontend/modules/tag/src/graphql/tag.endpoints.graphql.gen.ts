import * as Types from '@codelab/shared/abstract/codegen'

import { TagFragment } from '../../../../../shared/abstract/core/src/domain/tag/tag.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { TagFragmentDoc } from '../../../../../shared/abstract/core/src/domain/tag/tag.fragment.graphql.gen'
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
  tagGraphs: Array<{
    id: string
    isRoot: boolean
    name: string
    descendants: Array<string>
  }>
}

export const CreateTagsDocument = gql`
  mutation CreateTags($input: [TagCreateInput!]!) {
    createTags(input: $input) {
      tags {
        ...Tag
      }
    }
  }
  ${TagFragmentDoc}
`
export const UpdateTagsDocument = gql`
  mutation UpdateTags($where: TagWhere!, $update: TagUpdateInput!) {
    updateTags(where: $where, update: $update) {
      tags {
        ...Tag
      }
    }
  }
  ${TagFragmentDoc}
`
export const DeleteTagsDocument = gql`
  mutation DeleteTags($where: TagWhere!) {
    deleteTags(where: $where) {
      nodesDeleted
    }
  }
`
export const GetTagsDocument = gql`
  query GetTags($options: TagOptions, $where: TagWhere) {
    tags: tags(options: $options, where: $where) {
      ...Tag
    }
  }
  ${TagFragmentDoc}
`
export const GetTagGraphsDocument = gql`
  query GetTagGraphs {
    tagGraphs {
      id
      isRoot
      name
      descendants
      isRoot
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
    CreateTags(
      variables: CreateTagsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateTagsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateTagsMutation>(CreateTagsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateTags',
        'mutation',
      )
    },
    UpdateTags(
      variables: UpdateTagsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateTagsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateTagsMutation>(UpdateTagsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdateTags',
        'mutation',
      )
    },
    DeleteTags(
      variables: DeleteTagsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteTagsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteTagsMutation>(DeleteTagsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteTags',
        'mutation',
      )
    },
    GetTags(
      variables?: GetTagsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetTagsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTagsQuery>(GetTagsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetTags',
        'query',
      )
    },
    GetTagGraphs(
      variables?: GetTagGraphsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetTagGraphsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTagGraphsQuery>(GetTagGraphsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetTagGraphs',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
