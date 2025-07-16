import type * as Types from '@codelab/shared-infra-gqlgen'
import type { GraphQLClient } from 'graphql-request'

import { gqlRequest } from '@codelab/shared-infra-fetch'
import {
  AppListDocument,
  AppListPreviewDocument,
  CreateAppsDocument,
  DeleteAppsDocument,
  GetAppProductionDocument,
  UpdateAppsDocument,
} from '@codelab/shared-infra-gqlgen'

export const getSdk = (client: GraphQLClient) => ({
  AppList: (variables: Types.AppListQueryVariables) =>
    gqlRequest(client, AppListDocument.toString(), variables),
  AppListPreview: (variables: Types.AppListPreviewQueryVariables) =>
    gqlRequest(client, AppListPreviewDocument.toString(), variables),
  CreateApps: (variables: Types.CreateAppsMutationVariables) =>
    gqlRequest(client, CreateAppsDocument.toString(), variables),
  DeleteApps: (variables: Types.DeleteAppsMutationVariables) =>
    gqlRequest(client, DeleteAppsDocument.toString(), variables),
  GetAppProduction: (variables: Types.GetAppProductionQueryVariables) =>
    gqlRequest(client, GetAppProductionDocument.toString(), variables),
  UpdateApps: (variables: Types.UpdateAppsMutationVariables) =>
    gqlRequest(client, UpdateAppsDocument.toString(), variables),
})
