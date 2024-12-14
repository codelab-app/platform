import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
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

export const CreatePages = (
  variables: CreatePagesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreatePagesDocument.toString(), variables, next)

export const DeletePages = (
  variables: DeletePagesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeletePagesDocument.toString(), variables, next)

export const UpdatePages = (
  variables: UpdatePagesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdatePagesDocument.toString(), variables, next)

export const PageList = (
  variables: PageListQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(PageListDocument.toString(), variables, next)

export const GetRenderedPage = (
  variables: GetRenderedPageQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetRenderedPageDocument.toString(), variables, next)
