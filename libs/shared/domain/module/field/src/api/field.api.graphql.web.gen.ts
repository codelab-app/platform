import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { FieldFragmentDoc } from '@codelab/shared/infra/gqlgen'

import {
  type CreateFieldsMutationVariables,
  type UpdateFieldsMutationVariables,
  type DeleteFieldsMutationVariables,
  type GetFieldsQueryVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  CreateFieldsDocument,
  UpdateFieldsDocument,
  DeleteFieldsDocument,
  GetFieldsDocument,
} from './field.api.graphql.docs.gen'

export const CreateFields = (
  variables: CreateFieldsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateFieldsDocument.toString(), variables, next)

export const UpdateFields = (
  variables: UpdateFieldsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateFieldsDocument.toString(), variables, next)

export const DeleteFields = (
  variables: DeleteFieldsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteFieldsDocument.toString(), variables, next)

export const GetFields = (
  variables: GetFieldsQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetFieldsDocument.toString(), variables, next)
