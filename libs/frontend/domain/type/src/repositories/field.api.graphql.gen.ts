import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
import { FieldFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type CreateFieldsMutationVariables,
  type UpdateFieldsMutationVariables,
  type DeleteFieldsMutationVariables,
  type GetFieldsQueryVariables,
} from '@codelab/shared/infra/gql'
import {
  CreateFieldsDocument,
  UpdateFieldsDocument,
  DeleteFieldsDocument,
  GetFieldsDocument,
} from './field.api.documents.graphql.gen'

export const CreateFields = (
  variables: CreateFieldsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(CreateFieldsDocument.toString(), variables, next)

export const UpdateFields = (
  variables: UpdateFieldsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(UpdateFieldsDocument.toString(), variables, next)

export const DeleteFields = (
  variables: DeleteFieldsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(DeleteFieldsDocument.toString(), variables, next)

export const GetFields = (
  variables: GetFieldsQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetFieldsDocument.toString(), variables, next)
