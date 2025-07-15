import type * as Types from '@codelab/shared-infra-gqlgen'
import type { GraphQLClient } from 'graphql-request'

import { gqlRequest } from '@codelab/shared-infra-fetch'
import {
  CreateFieldsDocument,
  DeleteFieldsDocument,
  GetFieldsDocument,
  UpdateFieldsDocument,
} from '@codelab/shared-infra-gqlgen'

export const getSdk = (client: GraphQLClient) => ({
  CreateFields: (variables: Types.CreateFieldsMutationVariables) =>
    gqlRequest(client, CreateFieldsDocument.toString(), variables),
  DeleteFields: (variables: Types.DeleteFieldsMutationVariables) =>
    gqlRequest(client, DeleteFieldsDocument.toString(), variables),
  GetFields: (variables: Types.GetFieldsQueryVariables) =>
    gqlRequest(client, GetFieldsDocument.toString(), variables),
  UpdateFields: (variables: Types.UpdateFieldsMutationVariables) =>
    gqlRequest(client, UpdateFieldsDocument.toString(), variables),
})
