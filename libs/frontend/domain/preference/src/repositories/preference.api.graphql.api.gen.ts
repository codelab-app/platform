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

export const getSdk = () => ({
  CreatePreferences: (variables: CreatePreferencesMutationVariables) =>
    gqlRequest(CreatePreferencesDocument.toString(), variables),
  DeletePreferences: (variables: DeletePreferencesMutationVariables) =>
    gqlRequest(DeletePreferencesDocument.toString(), variables),
  GetPreferences: (variables: GetPreferencesQueryVariables) =>
    gqlRequest(GetPreferencesDocument.toString(), variables),
  UpdatePreferences: (variables: UpdatePreferencesMutationVariables) =>
    gqlRequest(UpdatePreferencesDocument.toString(), variables),
})
