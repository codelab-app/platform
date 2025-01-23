import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlRequest } from '@codelab/shared/infra/fetch'

import {
  type InterfaceForm_GetAppsQueryVariables,
  type InterfaceForm_GetAtomsQueryVariables,
  type InterfaceForm_GetActionsQueryVariables,
  type InterfaceForm_GetStoresQueryVariables,
  type InterfaceForm_GetResourceQueryVariables,
  type InterfaceForm_GetPagesQueryVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  InterfaceForm_GetAppsDocument,
  InterfaceForm_GetAtomsDocument,
  InterfaceForm_GetActionsDocument,
  InterfaceForm_GetStoresDocument,
  InterfaceForm_GetResourceDocument,
  InterfaceForm_GetPagesDocument,
} from './interface-form.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  InterfaceForm_GetApps: (variables: InterfaceForm_GetAppsQueryVariables) =>
    gqlRequest(client, InterfaceForm_GetAppsDocument.toString(), variables),
  InterfaceForm_GetAtoms: (variables: InterfaceForm_GetAtomsQueryVariables) =>
    gqlRequest(client, InterfaceForm_GetAtomsDocument.toString(), variables),
  InterfaceForm_GetActions: (
    variables: InterfaceForm_GetActionsQueryVariables,
  ) =>
    gqlRequest(client, InterfaceForm_GetActionsDocument.toString(), variables),
  InterfaceForm_GetStores: (variables: InterfaceForm_GetStoresQueryVariables) =>
    gqlRequest(client, InterfaceForm_GetStoresDocument.toString(), variables),
  InterfaceForm_GetResource: (
    variables: InterfaceForm_GetResourceQueryVariables,
  ) =>
    gqlRequest(client, InterfaceForm_GetResourceDocument.toString(), variables),
  InterfaceForm_GetPages: (variables: InterfaceForm_GetPagesQueryVariables) =>
    gqlRequest(client, InterfaceForm_GetPagesDocument.toString(), variables),
})
