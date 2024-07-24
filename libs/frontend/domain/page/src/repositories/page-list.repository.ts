import { type PageListQueryVariables } from '@codelab/frontend/infra/gql'
import { pageApi } from './page.api'

export const pageListRepository = async ({
  options,
  where,
}: PageListQueryVariables) => {
  return (await pageApi.PageList({ options, where })).items
}
