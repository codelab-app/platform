import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
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
        __typename
        id
      }
    }
  }
`)

export const UpdateAppsDocument = graphql(`
  mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {
    updateApps(update: $update, where: $where) {
      apps {
        __typename
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
