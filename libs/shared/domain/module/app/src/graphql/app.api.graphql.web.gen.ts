import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreateAppsDocument, UpdateAppsDocument, DeleteAppsDocument, AppListPreviewDocument, AppListDocument, GetAppProductionDocument } from '@codelab/shared/infra/gqlgen'



export const CreateApps = (variables: Types.CreateAppsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateAppsDocument.toString(), variables, next)
export const UpdateApps = (variables: Types.UpdateAppsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateAppsDocument.toString(), variables, next)
export const DeleteApps = (variables: Types.DeleteAppsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteAppsDocument.toString(), variables, next)
export const AppListPreview = (variables: Types.AppListPreviewQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(AppListPreviewDocument.toString(), variables, next)
export const AppList = (variables: Types.AppListQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(AppListDocument.toString(), variables, next)
export const GetAppProduction = (variables: Types.GetAppProductionQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetAppProductionDocument.toString(), variables, next)