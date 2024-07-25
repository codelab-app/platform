import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { type AppOptions, type AppWhere } from '@codelab/frontend/infra/gql'
import { appApi } from './app.api'

export const appListRepository = async (
  where?: AppWhere,
  options?: AppOptions,
) => {
  return await appApi.AppList(
    {
      options,
      where,
    },
    { tags: [CACHE_TAGS.APP_LIST] },
  )
}
