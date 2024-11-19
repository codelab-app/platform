import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlServerRequest } from '@codelab/shared/infra/fetch/use-server'

import {
  type InterfaceForm_GetAppsQueryVariables,
  type InterfaceForm_GetAtomsQueryVariables,
  type InterfaceForm_GetActionsQueryVariables,
  type InterfaceForm_GetStoresQueryVariables,
  type InterfaceForm_GetResourceQueryVariables,
  type InterfaceForm_GetPagesQueryVariables,
} from '@codelab/shared/infra/gql'
import {
  InterfaceForm_GetAppsDocument,
  InterfaceForm_GetAtomsDocument,
  InterfaceForm_GetActionsDocument,
  InterfaceForm_GetStoresDocument,
  InterfaceForm_GetResourceDocument,
  InterfaceForm_GetPagesDocument,
} from './interface-form.api.graphql.docs.gen'

export const InterfaceForm_GetApps = (
  variables: InterfaceForm_GetAppsQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(InterfaceForm_GetAppsDocument.toString(), variables, next)

export const InterfaceForm_GetAtoms = (
  variables: InterfaceForm_GetAtomsQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) =>
  gqlServerRequest(InterfaceForm_GetAtomsDocument.toString(), variables, next)

export const InterfaceForm_GetActions = (
  variables: InterfaceForm_GetActionsQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) =>
  gqlServerRequest(InterfaceForm_GetActionsDocument.toString(), variables, next)

export const InterfaceForm_GetStores = (
  variables: InterfaceForm_GetStoresQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) =>
  gqlServerRequest(InterfaceForm_GetStoresDocument.toString(), variables, next)

export const InterfaceForm_GetResource = (
  variables: InterfaceForm_GetResourceQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) =>
  gqlServerRequest(
    InterfaceForm_GetResourceDocument.toString(),
    variables,
    next,
  )

export const InterfaceForm_GetPages = (
  variables: InterfaceForm_GetPagesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) =>
  gqlServerRequest(InterfaceForm_GetPagesDocument.toString(), variables, next)
