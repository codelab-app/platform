import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
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
} from './preference.api.documents.graphql.gen'

export const CreatePreferences = (
  variables: CreatePreferencesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(CreatePreferencesDocument.toString(), variables, next)

export const DeletePreferences = (
  variables: DeletePreferencesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(DeletePreferencesDocument.toString(), variables, next)

export const GetPreferences = (
  variables: GetPreferencesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetPreferencesDocument.toString(), variables, next)

export const UpdatePreferences = (
  variables: UpdatePreferencesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(UpdatePreferencesDocument.toString(), variables, next)
