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
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  CreateTags: (variables: CreateTagsMutationVariables) =>
    gqlRequest(client, CreateTagsDocument.toString(), variables),
  UpdateTags: (variables: UpdateTagsMutationVariables) =>
    gqlRequest(client, UpdateTagsDocument.toString(), variables),
  DeleteTags: (variables: DeleteTagsMutationVariables) =>
    gqlRequest(client, DeleteTagsDocument.toString(), variables),
  GetTags: (variables: GetTagsQueryVariables) =>
    gqlRequest(client, GetTagsDocument.toString(), variables),
})
