import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
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

export const getSdk = () => ({
  CreateTags: (variables: CreateTagsMutationVariables) =>
    gqlRequest(CreateTagsDocument.toString(), variables),
  UpdateTags: (variables: UpdateTagsMutationVariables) =>
    gqlRequest(UpdateTagsDocument.toString(), variables),
  DeleteTags: (variables: DeleteTagsMutationVariables) =>
    gqlRequest(DeleteTagsDocument.toString(), variables),
  GetTags: (variables: GetTagsQueryVariables) =>
    gqlRequest(GetTagsDocument.toString(), variables),
})
