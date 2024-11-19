import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlServerRequest } from '@codelab/shared/infra/fetch/use-server'
import { TagFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type CreateTagsMutationVariables,
  type UpdateTagsMutationVariables,
  type DeleteTagsMutationVariables,
  type GetTagsQueryVariables,
} from '@codelab/shared/infra/gql'
import {
  CreateTagsDocument,
  UpdateTagsDocument,
  DeleteTagsDocument,
  GetTagsDocument,
} from './tag.api.graphql.docs.gen'

export const CreateTags = (
  variables: CreateTagsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateTagsDocument.toString(), variables, next)

export const UpdateTags = (
  variables: UpdateTagsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateTagsDocument.toString(), variables, next)

export const DeleteTags = (
  variables: DeleteTagsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteTagsDocument.toString(), variables, next)

export const GetTags = (
  variables: GetTagsQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetTagsDocument.toString(), variables, next)
