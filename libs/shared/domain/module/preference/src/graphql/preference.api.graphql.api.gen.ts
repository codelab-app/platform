import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import { PreferenceFragmentDoc } from '@codelab/shared/infra/gqlgen'

import {
  type CreatePreferencesMutationVariables,
  type DeletePreferencesMutationVariables,
  type GetPreferencesQueryVariables,
  type UpdatePreferencesMutationVariables,
} from '@codelab/shared/infra/gqlgen'
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
