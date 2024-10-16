import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
import {
  AppPreviewFragmentDoc,
  AppFragmentDoc,
  AppProductionFragmentDoc,
  AtomBuilderFragmentDoc,
  AtomProductionFragmentDoc,
  ResourceFragmentDoc,
} from '@codelab/shared/infra/gql'

import {
  type CreateAppsMutationVariables,
  type UpdateAppsMutationVariables,
  type DeleteAppsMutationVariables,
  type AppListPreviewQueryVariables,
  type AppListQueryVariables,
  type GetAppProductionQueryVariables,
} from '@codelab/shared/infra/gql'
import {
  CreateAppsDocument,
  UpdateAppsDocument,
  DeleteAppsDocument,
  AppListPreviewDocument,
  AppListDocument,
  GetAppProductionDocument,
} from './app.api.documents.graphql.gen'

export const CreateApps = (
  variables: CreateAppsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(CreateAppsDocument.toString(), variables, next)

export const UpdateApps = (
  variables: UpdateAppsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(UpdateAppsDocument.toString(), variables, next)

export const DeleteApps = (
  variables: DeleteAppsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(DeleteAppsDocument.toString(), variables, next)

export const AppListPreview = (
  variables: AppListPreviewQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(AppListPreviewDocument.toString(), variables, next)

export const AppList = (
  variables: AppListQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(AppListDocument.toString(), variables, next)

export const GetAppProduction = (
  variables: GetAppProductionQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetAppProductionDocument.toString(), variables, next)
