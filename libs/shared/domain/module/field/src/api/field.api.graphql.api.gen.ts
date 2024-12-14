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
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  CreateFields: (variables: CreateFieldsMutationVariables) =>
    gqlRequest(client, CreateFieldsDocument.toString(), variables),
  UpdateFields: (variables: UpdateFieldsMutationVariables) =>
    gqlRequest(client, UpdateFieldsDocument.toString(), variables),
  DeleteFields: (variables: DeleteFieldsMutationVariables) =>
    gqlRequest(client, DeleteFieldsDocument.toString(), variables),
  GetFields: (variables: GetFieldsQueryVariables) =>
    gqlRequest(client, GetFieldsDocument.toString(), variables),
})
