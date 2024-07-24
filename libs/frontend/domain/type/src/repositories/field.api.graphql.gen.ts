import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { FieldFragmentDoc } from '@codelab/frontend/infra/gql'

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
import {
  type CreateFieldsMutationVariables,
  type UpdateFieldsMutationVariables,
  type DeleteFieldsMutationVariables,
  type GetFieldsQueryVariables,
} from '@codelab/frontend/infra/gql'

const CreateFields = (
  variables: CreateFieldsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateFieldsDocument, variables, next)

const UpdateFields = (
  variables: UpdateFieldsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateFieldsDocument, variables, next)

const DeleteFields = (
  variables: DeleteFieldsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteFieldsDocument, variables, next)

const GetFields = (
  variables: GetFieldsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetFieldsDocument, variables, next)

export const getSdk = () => ({
  CreateFields,
  UpdateFields,
  DeleteFields,
  GetFields,
})
