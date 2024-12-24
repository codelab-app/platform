import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { PreferenceFragmentDoc } from '@codelab/shared/infra/gql'

export const CreatePreferencesDocument = graphql(`
  mutation CreatePreferences($input: [PreferenceCreateInput!]!) {
    createPreferences(input: $input) {
      info {
        nodesCreated
        relationshipsCreated
      }
      preferences {
        __typename
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
        __typename
        id
      }
    }
  }
`)
