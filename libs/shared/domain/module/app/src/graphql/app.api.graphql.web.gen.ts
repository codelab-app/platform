import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import type * as Types from '@codelab/shared-infra-gqlgen'

import { gqlServerRequest } from '@codelab/shared-infra-fetch-server'
import {
  AppListDocument,
  AppListPreviewDocument,
  CreateAppsDocument,
  DeleteAppsDocument,
  GetAppPreviewDocument,
  GetAppProductionDocument,
  UpdateAppsDocument,
} from '@codelab/shared-infra-gqlgen'

export const CreateApps = (
  variables: Types.CreateAppsMutationVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(CreateAppsDocument.toString(), variables, next)
export const UpdateApps = (
  variables: Types.UpdateAppsMutationVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(UpdateAppsDocument.toString(), variables, next)
export const DeleteApps = (
  variables: Types.DeleteAppsMutationVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(DeleteAppsDocument.toString(), variables, next)
export const AppListPreview = (
  variables: Types.AppListPreviewQueryVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(AppListPreviewDocument.toString(), variables, next)
export const AppList = (
  variables: Types.AppListQueryVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(AppListDocument.toString(), variables, next)
export const GetAppProduction = (
  variables: Types.GetAppProductionQueryVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(GetAppProductionDocument.toString(), variables, next)
export const GetAppPreview = (
  variables: Types.GetAppPreviewQueryVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(GetAppPreviewDocument.toString(), variables, next)
