import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { TagFragmentDoc } from '@codelab/shared/infra/gql'

export const CreateTagsDocument = graphql(`
  mutation CreateTags($input: [TagCreateInput!]!) {
    createTags(input: $input) {
      tags {
        id
      }
    }
  }
`)

export const UpdateTagsDocument = graphql(`
  mutation UpdateTags($where: TagWhere!, $update: TagUpdateInput!) {
    updateTags(update: $update, where: $where) {
      tags {
        id
      }
    }
  }
`)

export const DeleteTagsDocument = graphql(`
  mutation DeleteTags($where: TagWhere!) {
    deleteTags(where: $where) {
      nodesDeleted
    }
  }
`)

export const GetTagsDocument = graphql(`
  query GetTags($options: TagOptions, $where: TagWhere) {
    aggregate: tagsAggregate(where: $where) {
      count
    }
    items: tags(options: $options, where: $where) {
      ...Tag
    }
  }
`)

import {
  type CreateTagsMutationVariables,
  type UpdateTagsMutationVariables,
  type DeleteTagsMutationVariables,
  type GetTagsQueryVariables,
} from '@codelab/frontend/infra/gql'

export const CreateTags = (
  variables: CreateTagsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateTagsDocument.toString(), variables, next)

export const UpdateTags = (
  variables: UpdateTagsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateTagsDocument.toString(), variables, next)

export const DeleteTags = (
  variables: DeleteTagsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteTagsDocument.toString(), variables, next)

export const GetTags = (
  variables: GetTagsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetTagsDocument.toString(), variables, next)
