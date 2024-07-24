import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import {
  PageFragmentDoc,
  PageDevelopmentFragmentDoc,
} from '@codelab/frontend/infra/gql'

export const CreatePagesDocument = graphql(`
  mutation CreatePages($input: [PageCreateInput!]!) {
    createPages(input: $input) {
      pages {
        id
      }
    }
  }
`)

export const DeletePagesDocument = graphql(`
  mutation DeletePages($where: PageWhere, $delete: PageDeleteInput) {
    deletePages(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)

export const UpdatePagesDocument = graphql(`
  mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {
    updatePages(update: $update, where: $where) {
      pages {
        id
      }
    }
  }
`)

export const PageListDocument = graphql(`
  query PageList($options: PageOptions, $where: PageWhere) {
    aggregate: pagesAggregate(where: $where) {
      count
    }
    items: pages(options: $options, where: $where) {
      ...Page
    }
  }
`)

export const GetRenderedPageDocument = graphql(`
  query GetRenderedPage($pageId: ID!) {
    pages(where: { id: $pageId }) {
      ...PageDevelopment
    }
  }
`)
import {
  type CreatePagesMutationVariables,
  type DeletePagesMutationVariables,
  type UpdatePagesMutationVariables,
  type PageListQueryVariables,
  type GetRenderedPageQueryVariables,
} from '@codelab/frontend/infra/gql'

const CreatePages = (
  variables: CreatePagesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreatePagesDocument, variables, next)

const DeletePages = (
  variables: DeletePagesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeletePagesDocument, variables, next)

const UpdatePages = (
  variables: UpdatePagesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdatePagesDocument, variables, next)

const PageList = (
  variables: PageListQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(PageListDocument, variables, next)

const GetRenderedPage = (
  variables: GetRenderedPageQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetRenderedPageDocument, variables, next)

export const getSdk = () => ({
  CreatePages,
  DeletePages,
  UpdatePages,
  PageList,
  GetRenderedPage,
})
