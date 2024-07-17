import {
  graphql,
  type PageListQueryVariables,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

const PageListDocument = graphql(`
  query PageList($options: PageOptions, $where: PageWhere) {
    pages(options: $options, where: $where) {
      ...Page
    }
  }
`)

export const pageListRepository = async ({
  options,
  where,
}: PageListQueryVariables) => {
  return (await gqlFetch(PageListDocument, { options, where })).pages
}
