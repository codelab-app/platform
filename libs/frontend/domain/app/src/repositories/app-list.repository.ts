import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { type AppOptions, type AppWhere } from '@codelab/frontend/infra/gql'
import { AppList } from './app.api.graphql.gen'

export const appListRepository = async (
  where?: AppWhere,
  options?: AppOptions,
) => {
  return await AppList(
    {
      options,
      where,
    },
    { tags: [CACHE_TAGS.APP_LIST] },
  )
}
