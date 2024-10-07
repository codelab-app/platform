import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'

import {
  type IsTypeDescendantOfQueryVariables,
  type GetTypeReferencesQueryVariables,
} from '@codelab/shared/infra/gql'
import {
  IsTypeDescendantOfDocument,
  GetTypeReferencesDocument,
} from './type.api.documents.graphql.gen'

export const IsTypeDescendantOf = (
  variables: IsTypeDescendantOfQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(IsTypeDescendantOfDocument.toString(), variables, next)

export const GetTypeReferences = (
  variables: GetTypeReferencesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetTypeReferencesDocument.toString(), variables, next)
