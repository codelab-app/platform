import * as Types from '@codelab/shared-infra-gqlgen'

import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import { gqlServerRequest } from '@codelab/shared-infra-fetch-server'
import {
  CreateElementsDocument,
  DeleteElementsDocument,
  UpdateElementsDocument,
  ElementListDocument,
} from '@codelab/shared-infra-gqlgen'

export const CreateElements = (
  variables: Types.CreateElementsMutationVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(CreateElementsDocument.toString(), variables, next)
export const DeleteElements = (
  variables: Types.DeleteElementsMutationVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(DeleteElementsDocument.toString(), variables, next)
export const UpdateElements = (
  variables: Types.UpdateElementsMutationVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(UpdateElementsDocument.toString(), variables, next)
export const ElementList = (
  variables: Types.ElementListQueryVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(ElementListDocument.toString(), variables, next)
