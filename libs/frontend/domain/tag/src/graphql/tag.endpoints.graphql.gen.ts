import * as Types from '@codelab/shared/abstract/codegen'

import { TagFragment } from '../../../../abstract/core/src/domain/tag/tag.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { TagFragmentDoc } from '../../../../abstract/core/src/domain/tag/tag.fragment.graphql.gen'
export type CreateTagsMutationVariables = Types.Exact<{
  input: Array<Types.TagCreateInput> | Types.TagCreateInput
}>

export type CreateTagsMutation = { createTags: { tags: Array<{ id: string }> } }

export type UpdateTagsMutationVariables = Types.Exact<{
  where: Types.TagWhere
  update: Types.TagUpdateInput
}>

export type UpdateTagsMutation = { updateTags: { tags: Array<{ id: string }> } }

export type DeleteTagsMutationVariables = Types.Exact<{
  where: Types.TagWhere
}>

export type DeleteTagsMutation = { deleteTags: { nodesDeleted: number } }

export type GetTagsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.TagOptions>
  where?: Types.InputMaybe<Types.TagWhere>
}>

export type GetTagsQuery = {
  aggregate: { count: number }
  items: Array<TagFragment>
}

export const CreateTagsDocument = gql`
  mutation CreateTags($input: [TagCreateInput!]!) {
    createTags(input: $input) {
      tags {
        id
      }
    }
  }
`
export const UpdateTagsDocument = gql`
  mutation UpdateTags($where: TagWhere!, $update: TagUpdateInput!) {
    updateTags(where: $where, update: $update) {
      tags {
        id
      }
    }
  }
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
    aggregate: tagsAggregate(where: $where) {
      count
    }
    items: tags(options: $options, where: $where) {
      ...Tag
    }
  }
  ${TagFragmentDoc}
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
  }
}
export type Sdk = ReturnType<typeof getSdk>
