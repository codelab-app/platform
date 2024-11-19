import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import {
  PageFragmentDoc,
  PageDevelopmentFragmentDoc,
} from '@codelab/shared/infra/gql'

import {
  type CreatePagesMutationVariables,
  type DeletePagesMutationVariables,
  type UpdatePagesMutationVariables,
  type PageListQueryVariables,
  type GetRenderedPageQueryVariables,
} from '@codelab/shared/infra/gql'
import {
  CreatePagesDocument,
  DeletePagesDocument,
  UpdatePagesDocument,
  PageListDocument,
  GetRenderedPageDocument,
} from './page.api.graphql.docs.gen'

export const getSdk = () => ({
  CreatePages: (variables: CreatePagesMutationVariables) =>
    gqlRequest(CreatePagesDocument.toString(), variables),
  DeletePages: (variables: DeletePagesMutationVariables) =>
    gqlRequest(DeletePagesDocument.toString(), variables),
  UpdatePages: (variables: UpdatePagesMutationVariables) =>
    gqlRequest(UpdatePagesDocument.toString(), variables),
  PageList: (variables: PageListQueryVariables) =>
    gqlRequest(PageListDocument.toString(), variables),
  GetRenderedPage: (variables: GetRenderedPageQueryVariables) =>
    gqlRequest(GetRenderedPageDocument.toString(), variables),
})
