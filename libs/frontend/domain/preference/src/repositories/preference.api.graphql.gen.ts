import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { PreferenceFragmentDoc } from '@codelab/shared/infra/gql'

export const CreatePreferencesDocument = graphql(`
  mutation CreatePreferences($input: [PreferenceCreateInput!]!) {
    createPreferences(input: $input) {
      info {
        nodesCreated
        relationshipsCreated
      }
      preferences {
        id
      }
    }
  }
`)

export const DeletePreferencesDocument = graphql(`
  mutation DeletePreferences(
    $where: PreferenceWhere
    $delete: PreferenceDeleteInput
  ) {
    deletePreferences(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)

export const GetPreferencesDocument = graphql(`
  query GetPreferences($where: PreferenceWhere, $options: PreferenceOptions) {
    aggregate: preferencesAggregate(where: $where) {
      count
    }
    items: preferences(options: $options, where: $where) {
      ...Preference
    }
  }
`)

export const UpdatePreferencesDocument = graphql(`
  mutation UpdatePreferences(
    $where: PreferenceWhere
    $update: PreferenceUpdateInput
  ) {
    updatePreferences(update: $update, where: $where) {
      preferences {
        id
      }
    }
  }
`)

import {
  type CreatePreferencesMutationVariables,
  type DeletePreferencesMutationVariables,
  type GetPreferencesQueryVariables,
  type UpdatePreferencesMutationVariables,
} from '@codelab/shared/infra/gql'

export const CreatePreferences = (
  variables: CreatePreferencesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreatePreferencesDocument.toString(), variables, next)

export const DeletePreferences = (
  variables: DeletePreferencesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeletePreferencesDocument.toString(), variables, next)

export const GetPreferences = (
  variables: GetPreferencesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetPreferencesDocument.toString(), variables, next)

export const UpdatePreferences = (
  variables: UpdatePreferencesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdatePreferencesDocument.toString(), variables, next)
