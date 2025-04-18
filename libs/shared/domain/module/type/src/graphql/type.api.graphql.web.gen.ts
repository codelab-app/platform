import * as Types from '@codelab/shared-infra-gqlgen'

import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import { gqlServerRequest } from '@codelab/shared-infra-fetch-server'
import {
  IsTypeDescendantOfDocument,
  GetTypeReferencesDocument,
} from '@codelab/shared-infra-gqlgen'

export const IsTypeDescendantOf = (
  variables: Types.IsTypeDescendantOfQueryVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(IsTypeDescendantOfDocument.toString(), variables, next)
export const GetTypeReferences = (
  variables: Types.GetTypeReferencesQueryVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(GetTypeReferencesDocument.toString(), variables, next)
