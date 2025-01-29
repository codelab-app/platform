import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreatePreferencesDocument, DeletePreferencesDocument, GetPreferencesDocument, UpdatePreferencesDocument } from './preference.api.graphql.docs.gen'


export const CreatePreferences = (variables: Types.CreatePreferencesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreatePreferencesDocument.toString(), variables, next)
export const DeletePreferences = (variables: Types.DeletePreferencesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeletePreferencesDocument.toString(), variables, next)
export const GetPreferences = (variables: Types.GetPreferencesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetPreferencesDocument.toString(), variables, next)
export const UpdatePreferences = (variables: Types.UpdatePreferencesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdatePreferencesDocument.toString(), variables, next)