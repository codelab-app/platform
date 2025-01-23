import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'

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
