import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
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
} from './page.api.documents.graphql.gen'

export const CreatePages = (
  variables: CreatePagesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(CreatePagesDocument.toString(), variables, next)

export const DeletePages = (
  variables: DeletePagesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(DeletePagesDocument.toString(), variables, next)

export const UpdatePages = (
  variables: UpdatePagesMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(UpdatePagesDocument.toString(), variables, next)

export const PageList = (
  variables: PageListQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(PageListDocument.toString(), variables, next)

export const GetRenderedPage = (
  variables: GetRenderedPageQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetRenderedPageDocument.toString(), variables, next)
