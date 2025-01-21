import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
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

export const CreatePreferences = (
  variables: CreatePreferencesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreatePreferencesDocument.toString(), variables, next)

export const DeletePreferences = (
  variables: DeletePreferencesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeletePreferencesDocument.toString(), variables, next)

export const GetPreferences = (
  variables: GetPreferencesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetPreferencesDocument.toString(), variables, next)

export const UpdatePreferences = (
  variables: UpdatePreferencesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdatePreferencesDocument.toString(), variables, next)
