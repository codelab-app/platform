import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import { PreferenceFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type CreatePreferencesMutationVariables,
  type DeletePreferencesMutationVariables,
  type GetPreferencesQueryVariables,
  type UpdatePreferencesMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  CreatePreferencesDocument,
  DeletePreferencesDocument,
  GetPreferencesDocument,
  UpdatePreferencesDocument,
} from './preference.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  CreatePreferences: (variables: CreatePreferencesMutationVariables) =>
    gqlRequest(client, CreatePreferencesDocument.toString(), variables),
  DeletePreferences: (variables: DeletePreferencesMutationVariables) =>
    gqlRequest(client, DeletePreferencesDocument.toString(), variables),
  GetPreferences: (variables: GetPreferencesQueryVariables) =>
    gqlRequest(client, GetPreferencesDocument.toString(), variables),
  UpdatePreferences: (variables: UpdatePreferencesMutationVariables) =>
    gqlRequest(client, UpdatePreferencesDocument.toString(), variables),
})
