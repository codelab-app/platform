import * as Types from '@codelab/shared-infra-gqlgen'

import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import { gqlServerRequest } from '@codelab/shared-infra-fetch-server'
import {
  CreateTagsDocument,
  UpdateTagsDocument,
  DeleteTagsDocument,
  GetTagsDocument,
} from '@codelab/shared-infra-gqlgen'

export const CreateTags = (
  variables: Types.CreateTagsMutationVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(CreateTagsDocument.toString(), variables, next)
export const UpdateTags = (
  variables: Types.UpdateTagsMutationVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(UpdateTagsDocument.toString(), variables, next)
export const DeleteTags = (
  variables: Types.DeleteTagsMutationVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(DeleteTagsDocument.toString(), variables, next)
export const GetTags = (
  variables: Types.GetTagsQueryVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(GetTagsDocument.toString(), variables, next)
