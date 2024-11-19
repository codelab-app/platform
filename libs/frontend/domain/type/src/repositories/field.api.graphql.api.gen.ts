import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import { FieldFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type CreateFieldsMutationVariables,
  type UpdateFieldsMutationVariables,
  type DeleteFieldsMutationVariables,
  type GetFieldsQueryVariables,
} from '@codelab/shared/infra/gql'
import {
  CreateFieldsDocument,
  UpdateFieldsDocument,
  DeleteFieldsDocument,
  GetFieldsDocument,
} from './field.api.graphql.docs.gen'

export const getSdk = () => ({
  CreateFields: (variables: CreateFieldsMutationVariables) =>
    gqlRequest(CreateFieldsDocument.toString(), variables),
  UpdateFields: (variables: UpdateFieldsMutationVariables) =>
    gqlRequest(UpdateFieldsDocument.toString(), variables),
  DeleteFields: (variables: DeleteFieldsMutationVariables) =>
    gqlRequest(DeleteFieldsDocument.toString(), variables),
  GetFields: (variables: GetFieldsQueryVariables) =>
    gqlRequest(GetFieldsDocument.toString(), variables),
})
