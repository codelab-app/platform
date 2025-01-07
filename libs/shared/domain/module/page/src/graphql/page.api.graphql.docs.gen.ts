import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import {
  PageFragmentDoc,
  PageDevelopmentFragmentDoc,
} from '@codelab/shared/infra/gql'

export const CreatePagesDocument = graphql(`
  mutation CreatePages($input: [PageCreateInput!]!) {
    createPages(input: $input) {
      pages {
        __typename
        id
        rootElement {
          id
        }
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
        __typename
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
