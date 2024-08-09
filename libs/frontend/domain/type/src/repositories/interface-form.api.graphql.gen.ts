import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

export const InterfaceForm_GetAppsDocument = graphql(`
  query InterfaceForm_GetApps($options: AppOptions, $where: AppWhere) {
    apps(options: $options, where: $where) {
      id
      name
    }
  }
`)

export const InterfaceForm_GetAtomsDocument = graphql(`
  query InterfaceForm_GetAtoms($options: AtomOptions, $where: AtomWhere) {
    atoms(options: $options, where: $where) {
      id
      name
      type
    }
  }
`)

export const InterfaceForm_GetActionsDocument = graphql(`
  query InterfaceForm_GetActions($appId: ID) {
    apiActions {
      id
      name
    }
    codeActions {
      id
      name
    }
  }
`)

export const InterfaceForm_GetStoresDocument = graphql(`
  query InterfaceForm_GetStores($options: StoreOptions, $where: StoreWhere) {
    stores(options: $options, where: $where) {
      id
      name
    }
  }
`)

export const InterfaceForm_GetResourceDocument = graphql(`
  query InterfaceForm_GetResource(
    $options: ResourceOptions
    $where: ResourceWhere
  ) {
    resources(options: $options, where: $where) {
      id
      name
    }
  }
`)

export const InterfaceForm_GetPagesDocument = graphql(`
  query InterfaceForm_GetPages($options: PageOptions, $where: PageWhere) {
    pages(options: $options, where: $where) {
      id
      name
    }
  }
`)

import {
  type InterfaceForm_GetAppsQueryVariables,
  type InterfaceForm_GetAtomsQueryVariables,
  type InterfaceForm_GetActionsQueryVariables,
  type InterfaceForm_GetStoresQueryVariables,
  type InterfaceForm_GetResourceQueryVariables,
  type InterfaceForm_GetPagesQueryVariables,
} from '@codelab/frontend/infra/gql'

export const InterfaceForm_GetApps = (
  variables: InterfaceForm_GetAppsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(InterfaceForm_GetAppsDocument.toString(), variables, next)

export const InterfaceForm_GetAtoms = (
  variables: InterfaceForm_GetAtomsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(InterfaceForm_GetAtomsDocument.toString(), variables, next)

export const InterfaceForm_GetActions = (
  variables: InterfaceForm_GetActionsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(InterfaceForm_GetActionsDocument.toString(), variables, next)

export const InterfaceForm_GetStores = (
  variables: InterfaceForm_GetStoresQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(InterfaceForm_GetStoresDocument.toString(), variables, next)

export const InterfaceForm_GetResource = (
  variables: InterfaceForm_GetResourceQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(InterfaceForm_GetResourceDocument.toString(), variables, next)

export const InterfaceForm_GetPages = (
  variables: InterfaceForm_GetPagesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(InterfaceForm_GetPagesDocument.toString(), variables, next)
