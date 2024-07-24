import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { TagFragmentDoc } from '@codelab/frontend/infra/gql'

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

const CreateTags = (
  variables: CreateTagsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateTagsDocument, variables, next)

const UpdateTags = (
  variables: UpdateTagsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateTagsDocument, variables, next)

const DeleteTags = (
  variables: DeleteTagsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteTagsDocument, variables, next)

const GetTags = (
  variables: GetTagsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetTagsDocument, variables, next)

export const getSdk = () => ({ CreateTags, UpdateTags, DeleteTags, GetTags })
