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

export const getSdk = () => ({
  IsTypeDescendantOf: (variables: IsTypeDescendantOfQueryVariables) =>
    gqlRequest(IsTypeDescendantOfDocument.toString(), variables),
  GetTypeReferences: (variables: GetTypeReferencesQueryVariables) =>
    gqlRequest(GetTypeReferencesDocument.toString(), variables),
})
