import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import {
  AppFragmentDoc,
  AppPreviewFragmentDoc,
} from '../../../../abstract/domain/src/app/app.fragment.graphql.gen'
import {
  AtomDevelopmentFragmentDoc,
  AtomProductionFragmentDoc,
} from '../../../../abstract/domain/src/atom/atom.fragment.graphql.gen'

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

export const GetAppsDocument = graphql(`
  query GetApps($options: AppOptions, $where: AppWhere) {
    aggregate: appsAggregate(where: $where) {
      count
    }
    items: apps(options: $options, where: $where) {
      ...App
    }
  }
  ${AppFragmentDoc}
`)

export const GetAppsListDocument = graphql(`
  query GetAppsList($options: AppOptions, $where: AppWhere) {
    apps(options: $options, where: $where) {
      ...AppPreview
    }
    atoms(where: { type: ReactFragment }) {
      ...AtomDevelopment
    }
  }
  ${AppPreviewFragmentDoc}
  ${AtomDevelopmentFragmentDoc}
`)
import {
  type CreateAppsMutationVariables,
  type UpdateAppsMutationVariables,
  type DeleteAppsMutationVariables,
  type GetAppsQueryVariables,
  type GetAppsListQueryVariables,
} from '@codelab/frontend/infra/gql'

export const createAppsMutation = (variables: CreateAppsMutationVariables) =>
  gqlFetch(CreateAppsDocument, variables)

export const updateAppsMutation = (variables: UpdateAppsMutationVariables) =>
  gqlFetch(UpdateAppsDocument, variables)

export const deleteAppsMutation = (variables: DeleteAppsMutationVariables) =>
  gqlFetch(DeleteAppsDocument, variables)

export const getAppsQuery = (variables: GetAppsQueryVariables) =>
  gqlFetch(GetAppsDocument, variables)

export const getAppsListQuery = (variables: GetAppsListQueryVariables) =>
  gqlFetch(GetAppsListDocument, variables)
