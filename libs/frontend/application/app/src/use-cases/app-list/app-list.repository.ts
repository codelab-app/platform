'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import {
  type AppListQueryVariables,
  graphql,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import type { IAppDto, IAtomDto } from '@codelab/shared/abstract/core'

const AppListDocument = graphql(`
  query AppList($options: AppOptions, $where: AppWhere) {
    apps(options: $options, where: $where) {
      ...AppPreview
    }
    atoms(where: { type: ReactFragment }) {
      ...AtomDevelopment
    }
  }
`)

export const appListRepository = async ({
  options,
  where,
}: AppListQueryVariables): Promise<{
  atoms: Array<IAtomDto>
  apps: Array<IAppDto>
}> => {
  const { apps, atoms } = await gqlFetch(
    AppListDocument,
    {
      options,
      where,
    },
    { tags: [CACHE_TAGS.APP_LIST] },
  )

  return { apps, atoms }
}
