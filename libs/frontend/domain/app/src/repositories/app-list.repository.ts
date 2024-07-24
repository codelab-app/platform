import {
  CACHE_TAGS,
  type IAppRepository,
} from '@codelab/frontend/abstract/domain'
import {
  type AppListQueryVariables,
  type AppOptions,
  type AppWhere,
  graphql,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import type { IAppDto, IAtomDto } from '@codelab/shared/abstract/core'
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
