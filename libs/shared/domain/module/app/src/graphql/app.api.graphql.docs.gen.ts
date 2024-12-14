import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import {
  AppFragmentDoc,
  AtomBuilderFragmentDoc,
  AtomProductionFragmentDoc,
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
