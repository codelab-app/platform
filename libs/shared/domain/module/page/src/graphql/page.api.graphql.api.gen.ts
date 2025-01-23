import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import {
  PageFragmentDoc,
  PageDevelopmentFragmentDoc,
} from '@codelab/shared/infra/gqlgen'

import {
  type CreatePagesMutationVariables,
  type DeletePagesMutationVariables,
  type UpdatePagesMutationVariables,
  type PageListQueryVariables,
  type GetRenderedPageQueryVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  CreatePagesDocument,
  DeletePagesDocument,
  UpdatePagesDocument,
  PageListDocument,
  GetRenderedPageDocument,
} from './page.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  CreatePages: (variables: CreatePagesMutationVariables) =>
    gqlRequest(client, CreatePagesDocument.toString(), variables),
  DeletePages: (variables: DeletePagesMutationVariables) =>
    gqlRequest(client, DeletePagesDocument.toString(), variables),
  UpdatePages: (variables: UpdatePagesMutationVariables) =>
    gqlRequest(client, UpdatePagesDocument.toString(), variables),
  PageList: (variables: PageListQueryVariables) =>
    gqlRequest(client, PageListDocument.toString(), variables),
  GetRenderedPage: (variables: GetRenderedPageQueryVariables) =>
    gqlRequest(client, GetRenderedPageDocument.toString(), variables),
})
