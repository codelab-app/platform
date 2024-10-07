import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
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
} from './tag.api.documents.graphql.gen'

export const CreateTags = (
  variables: CreateTagsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateTagsDocument.toString(), variables, next)

export const UpdateTags = (
  variables: UpdateTagsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateTagsDocument.toString(), variables, next)

export const DeleteTags = (
  variables: DeleteTagsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteTagsDocument.toString(), variables, next)

export const GetTags = (
  variables: GetTagsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetTagsDocument.toString(), variables, next)
