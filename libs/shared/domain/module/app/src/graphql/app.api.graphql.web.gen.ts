import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import {
  AppFragmentDoc,
  AtomBuilderFragmentDoc,
  AtomProductionFragmentDoc,
} from '@codelab/shared/infra/gql'

import {
  type CreateAppsMutationVariables,
  type UpdateAppsMutationVariables,
  type DeleteAppsMutationVariables,
  type AppListQueryVariables,
} from '@codelab/shared/infra/gql'
import {
  CreateAppsDocument,
  UpdateAppsDocument,
  DeleteAppsDocument,
  AppListDocument,
} from './app.api.graphql.docs.gen'

export const CreateApps = (
  variables: CreateAppsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateAppsDocument.toString(), variables, next)

export const UpdateApps = (
  variables: UpdateAppsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateAppsDocument.toString(), variables, next)

export const DeleteApps = (
  variables: DeleteAppsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteAppsDocument.toString(), variables, next)

export const AppList = (
  variables: AppListQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(AppListDocument.toString(), variables, next)
