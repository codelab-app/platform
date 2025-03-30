import * as Types from '@codelab/shared/infra/gqlgen';

import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreatePreferencesDocument, DeletePreferencesDocument, GetPreferencesDocument, UpdatePreferencesDocument } from '@codelab/shared/infra/gqlgen'

export const CreatePreferences = (variables: Types.CreatePreferencesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreatePreferencesDocument.toString(), variables, next)
export const DeletePreferences = (variables: Types.DeletePreferencesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(DeletePreferencesDocument.toString(), variables, next)
export const GetPreferences = (variables: Types.GetPreferencesQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetPreferencesDocument.toString(), variables, next)
export const UpdatePreferences = (variables: Types.UpdatePreferencesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(UpdatePreferencesDocument.toString(), variables, next)
