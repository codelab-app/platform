'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import {
  type GetAppsListQueryVariables,
  graphql,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import type { IAppDto, IAtomDto } from '@codelab/shared/abstract/core'
import { revalidateTag } from 'next/cache'

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

export const appListRepository = async ({
  options,
  where,
}: GetAppsListQueryVariables): Promise<{
  atoms: Array<IAtomDto>
  apps: Array<IAppDto>
}> => {
  const { apps, atoms } = await gqlFetch(
    GetAppsListQuery,
    {
      options,
      where,
    },
    { tags: [CACHE_TAGS.APP_LIST] },
  )

  return { apps, atoms }
}

export const refreshAppListAction = () => revalidateTag(CACHE_TAGS.APP_LIST)
