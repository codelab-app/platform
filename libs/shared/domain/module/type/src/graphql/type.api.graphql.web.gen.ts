import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'

import {
  type IsTypeDescendantOfQueryVariables,
  type GetTypeReferencesQueryVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  IsTypeDescendantOfDocument,
  GetTypeReferencesDocument,
} from './type.api.graphql.docs.gen'

export const IsTypeDescendantOf = (
  variables: IsTypeDescendantOfQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(IsTypeDescendantOfDocument.toString(), variables, next)

export const GetTypeReferences = (
  variables: GetTypeReferencesQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetTypeReferencesDocument.toString(), variables, next)
