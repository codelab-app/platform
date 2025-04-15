import * as Types from '@codelab/shared-infra-gqlgen';

import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import { gqlServerRequest } from '@codelab/shared-infra-fetch-server'
import { CreateFieldsDocument, UpdateFieldsDocument, DeleteFieldsDocument, GetFieldsDocument } from '@codelab/shared-infra-gqlgen'

export const CreateFields = (variables: Types.CreateFieldsMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreateFieldsDocument.toString(), variables, next)
export const UpdateFields = (variables: Types.UpdateFieldsMutationVariables, next?: NextFetchOptions) => gqlServerRequest(UpdateFieldsDocument.toString(), variables, next)
export const DeleteFields = (variables: Types.DeleteFieldsMutationVariables, next?: NextFetchOptions) => gqlServerRequest(DeleteFieldsDocument.toString(), variables, next)
export const GetFields = (variables: Types.GetFieldsQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetFieldsDocument.toString(), variables, next)
