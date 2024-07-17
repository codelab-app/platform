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

const AppListDocument = graphql(`
  query AppList($options: AppOptions, $where: AppWhere) {
    aggregate: appsAggregate(where: $where) {
      count
    }
    items: apps(options: $options, where: $where) {
      ...AppPreview
    }
  }
`)

export const appListRepository: IAppRepository['find'] = async (
  where?: AppWhere,
  options?: AppOptions,
) => {
  return await gqlFetch(
    AppListDocument,
    {
      options,
      where,
    },
    { tags: [CACHE_TAGS.APP_LIST] },
  )
}
