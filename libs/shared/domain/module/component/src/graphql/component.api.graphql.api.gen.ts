import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import { ComponentFragmentDoc } from '@codelab/shared/infra/gqlgen'

import {
  type CreateComponentsMutationVariables,
  type DeleteComponentsMutationVariables,
  type UpdateComponentsMutationVariables,
  type ComponentListQueryVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  CreateComponentsDocument,
  DeleteComponentsDocument,
  UpdateComponentsDocument,
  ComponentListDocument,
} from './component.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  CreateComponents: (variables: CreateComponentsMutationVariables) =>
    gqlRequest(client, CreateComponentsDocument.toString(), variables),
  DeleteComponents: (variables: DeleteComponentsMutationVariables) =>
    gqlRequest(client, DeleteComponentsDocument.toString(), variables),
  UpdateComponents: (variables: UpdateComponentsMutationVariables) =>
    gqlRequest(client, UpdateComponentsDocument.toString(), variables),
  ComponentList: (variables: ComponentListQueryVariables) =>
    gqlRequest(client, ComponentListDocument.toString(), variables),
})
