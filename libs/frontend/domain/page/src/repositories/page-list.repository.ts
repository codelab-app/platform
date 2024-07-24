import {
  graphql,
  type PageListQueryVariables,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { pageApi } from './page.api'

export const pageListRepository = async ({
  options,
  where,
}: PageListQueryVariables) => {
  return (await pageApi.PageList({ options, where })).items
}
