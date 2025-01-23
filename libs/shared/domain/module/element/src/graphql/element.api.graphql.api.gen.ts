import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import {
  ElementFragmentDoc,
  ElementProductionFragmentDoc,
} from '@codelab/shared/infra/gqlgen'

import {
  type CreateElementsMutationVariables,
  type DeleteElementsMutationVariables,
  type UpdateElementsMutationVariables,
  type ElementListQueryVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  CreateElementsDocument,
  DeleteElementsDocument,
  UpdateElementsDocument,
  ElementListDocument,
} from './element.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  CreateElements: (variables: CreateElementsMutationVariables) =>
    gqlRequest(client, CreateElementsDocument.toString(), variables),
  DeleteElements: (variables: DeleteElementsMutationVariables) =>
    gqlRequest(client, DeleteElementsDocument.toString(), variables),
  UpdateElements: (variables: UpdateElementsMutationVariables) =>
    gqlRequest(client, UpdateElementsDocument.toString(), variables),
  ElementList: (variables: ElementListQueryVariables) =>
    gqlRequest(client, ElementListDocument.toString(), variables),
})
