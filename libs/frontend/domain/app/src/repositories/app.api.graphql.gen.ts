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

export const CreateAppsDocument = graphql(`
  mutation CreateApps($input: [AppCreateInput!]!) {
    createApps(input: $input) {
      apps {
        id
      }
    }
  }
`)

export const UpdateAppsDocument = graphql(`
  mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {
    updateApps(update: $update, where: $where) {
      apps {
        id
      }
    }
  }
`)

export const DeleteAppsDocument = graphql(`
  mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {
    deleteApps(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)

export const AppListPreviewDocument = graphql(`
  query AppListPreview($options: AppOptions, $where: AppWhere) {
    aggregate: appsAggregate(where: $where) {
      count
    }
    items: apps(options: $options, where: $where) {
      ...AppPreview
    }
  }
`)

export const AppListDocument = graphql(`
  query AppList($options: AppOptions, $where: AppWhere) {
    items: apps(options: $options, where: $where) {
      ...App
    }
    aggregate: appsAggregate(where: $where) {
      count
    }
    atoms(where: { type: ReactFragment }) {
      ...AtomBuilder
    }
  }
`)

export const GetAppProductionDocument = graphql(`
  query GetAppProduction($domain: String!, $pageUrlPattern: String!) {
    apps(where: { domains_SOME: { name_IN: [$domain] } }) {
      ...AppProduction
    }
    atoms(where: { type: ReactFragment }) {
      ...AtomProduction
    }
    resources {
      ...Resource
    }
  }
`)

import {
  type CreateAppsMutationVariables,
  type UpdateAppsMutationVariables,
  type DeleteAppsMutationVariables,
  type AppListPreviewQueryVariables,
  type AppListQueryVariables,
  type GetAppProductionQueryVariables,
} from '@codelab/shared/infra/gql'

export const CreateApps = (
  variables: CreateAppsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateAppsDocument.toString(), variables, next)

export const UpdateApps = (
  variables: UpdateAppsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateAppsDocument.toString(), variables, next)

export const DeleteApps = (
  variables: DeleteAppsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteAppsDocument.toString(), variables, next)

export const AppListPreview = (
  variables: AppListPreviewQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(AppListPreviewDocument.toString(), variables, next)

export const AppList = (
  variables: AppListQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(AppListDocument.toString(), variables, next)

export const GetAppProduction = (
  variables: GetAppProductionQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetAppProductionDocument.toString(), variables, next)
