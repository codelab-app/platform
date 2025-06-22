import * as Types from '@codelab/shared-infra-gqlgen'

import { gqlRequest } from '@codelab/shared-infra-fetch'
import { GraphQLClient } from 'graphql-request'
import {
  CreatePreferencesDocument,
  DeletePreferencesDocument,
  GetPreferencesDocument,
  UpdatePreferencesDocument,
} from '@codelab/shared-infra-gqlgen'

export const getSdk = (client: GraphQLClient) => ({
  CreatePreferences: (variables: Types.CreatePreferencesMutationVariables) =>
    gqlRequest(client, CreatePreferencesDocument.toString(), variables),
  DeletePreferences: (variables: Types.DeletePreferencesMutationVariables) =>
    gqlRequest(client, DeletePreferencesDocument.toString(), variables),
  GetPreferences: (variables: Types.GetPreferencesQueryVariables) =>
    gqlRequest(client, GetPreferencesDocument.toString(), variables),
  UpdatePreferences: (variables: Types.UpdatePreferencesMutationVariables) =>
    gqlRequest(client, UpdatePreferencesDocument.toString(), variables),
})
