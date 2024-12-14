import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
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
} from './app.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  CreateApps: (variables: CreateAppsMutationVariables) =>
    gqlRequest(CreateAppsDocument.toString(), variables),
  UpdateApps: (variables: UpdateAppsMutationVariables) =>
    gqlRequest(UpdateAppsDocument.toString(), variables),
  DeleteApps: (variables: DeleteAppsMutationVariables) =>
    gqlRequest(DeleteAppsDocument.toString(), variables),
  AppListPreview: (variables: AppListPreviewQueryVariables) =>
    gqlRequest(AppListPreviewDocument.toString(), variables),
  AppList: (variables: AppListQueryVariables) =>
    gqlRequest(AppListDocument.toString(), variables),
  GetAppProduction: (variables: GetAppProductionQueryVariables) =>
    gqlRequest(GetAppProductionDocument.toString(), variables),
})
