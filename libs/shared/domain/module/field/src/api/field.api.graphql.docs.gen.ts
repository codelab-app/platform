import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { FieldFragmentDoc } from '@codelab/shared/infra/gql'

export const CreateFieldsDocument = graphql(`
  mutation CreateFields($input: [FieldCreateInput!]!) {
    createFields(input: $input) {
      fields {
        id
      }
    }
  }
`)

export const UpdateFieldsDocument = graphql(`
  mutation UpdateFields($where: FieldWhere!, $update: FieldUpdateInput!) {
    updateFields(update: $update, where: $where) {
      fields {
        id
      }
    }
  }
`)

export const DeleteFieldsDocument = graphql(`
  mutation DeleteFields($where: FieldWhere!) {
    deleteFields(where: $where) {
      nodesDeleted
    }
  }
`)

export const GetFieldsDocument = graphql(`
  query GetFields($where: FieldWhere, $options: FieldOptions) {
    aggregate: fieldsAggregate(where: $where) {
      count
    }
    items: fields(options: $options, where: $where) {
      ...Field
    }
  }
`)
