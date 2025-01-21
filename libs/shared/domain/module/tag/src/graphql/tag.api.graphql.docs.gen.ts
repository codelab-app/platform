import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { TagFragmentDoc } from '@codelab/shared/infra/gqlgen'

export const CreateTagsDocument = graphql(`
  mutation CreateTags($input: [TagCreateInput!]!) {
    createTags(input: $input) {
      tags {
        __typename
        id
      }
    }
  }
`)

export const UpdateTagsDocument = graphql(`
  mutation UpdateTags($where: TagWhere!, $update: TagUpdateInput!) {
    updateTags(update: $update, where: $where) {
      tags {
        __typename
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
