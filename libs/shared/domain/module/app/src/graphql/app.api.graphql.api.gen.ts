import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
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
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  CreateApps: (variables: CreateAppsMutationVariables) =>
    gqlRequest(client, CreateAppsDocument.toString(), variables),
  UpdateApps: (variables: UpdateAppsMutationVariables) =>
    gqlRequest(client, UpdateAppsDocument.toString(), variables),
  DeleteApps: (variables: DeleteAppsMutationVariables) =>
    gqlRequest(client, DeleteAppsDocument.toString(), variables),
  AppList: (variables: AppListQueryVariables) =>
    gqlRequest(client, AppListDocument.toString(), variables),
})
