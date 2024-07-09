'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import {
  execute,
  type GetAppsListQueryVariables,
  graphql,
} from '@codelab/frontend/infra/gql'
import type { IAppDto, IAtomDto } from '@codelab/shared/abstract/core'

const GetAppsListQuery = graphql(`
  query GetAppsList($options: AppOptions, $where: AppWhere) {
    apps(options: $options, where: $where) {
      ...AppPreview
    }
    atoms(where: { type: ReactFragment }) {
      ...AtomDevelopment
    }
  }
`)

export const appListAction = async ({
  options,
  where,
}: GetAppsListQueryVariables): Promise<{
  atoms: Array<IAtomDto>
  apps: Array<IAppDto>
}> => {
  const { apps, atoms } = await execute(
    GetAppsListQuery,
    {
      options,
      where,
    },
    { tags: [CACHE_TAGS.APP_LIST] },
  )

  return { apps, atoms }
}
