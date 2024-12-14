import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'

import {
  type IsTypeDescendantOfQueryVariables,
  type GetTypeReferencesQueryVariables,
} from '@codelab/shared/infra/gql'
import {
  IsTypeDescendantOfDocument,
  GetTypeReferencesDocument,
} from './type.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  IsTypeDescendantOf: (variables: IsTypeDescendantOfQueryVariables) =>
    gqlRequest(client, IsTypeDescendantOfDocument.toString(), variables),
  GetTypeReferences: (variables: GetTypeReferencesQueryVariables) =>
    gqlRequest(client, GetTypeReferencesDocument.toString(), variables),
})
