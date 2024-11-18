import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import {
  TagFragmentDoc,
  TagPreviewFragmentDoc,
} from '@codelab/shared/infra/gql'

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
