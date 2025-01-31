import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { InterfaceForm_GetAppsDocument, InterfaceForm_GetAtomsDocument, InterfaceForm_GetActionsDocument, InterfaceForm_GetStoresDocument, InterfaceForm_GetResourceDocument, InterfaceForm_GetPagesDocument } from '@codelab/shared/infra/gqlgen'

export const InterfaceForm_GetApps = (variables: Types.InterfaceForm_GetAppsQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(InterfaceForm_GetAppsDocument.toString(), variables, next)
export const InterfaceForm_GetAtoms = (variables: Types.InterfaceForm_GetAtomsQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(InterfaceForm_GetAtomsDocument.toString(), variables, next)
export const InterfaceForm_GetActions = (variables: Types.InterfaceForm_GetActionsQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(InterfaceForm_GetActionsDocument.toString(), variables, next)
export const InterfaceForm_GetStores = (variables: Types.InterfaceForm_GetStoresQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(InterfaceForm_GetStoresDocument.toString(), variables, next)
export const InterfaceForm_GetResource = (variables: Types.InterfaceForm_GetResourceQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(InterfaceForm_GetResourceDocument.toString(), variables, next)
export const InterfaceForm_GetPages = (variables: Types.InterfaceForm_GetPagesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(InterfaceForm_GetPagesDocument.toString(), variables, next)
