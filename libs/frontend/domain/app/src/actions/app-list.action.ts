'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import type { GetAppsListQueryVariables } from '@codelab/frontend/infra/gql'
import { execute } from '@codelab/frontend/infra/gql'
import type { IAppDto, IAtomDto } from '@codelab/shared/abstract/core'
import { revalidateTag } from 'next/cache'
import { GetAppsListQuery } from './app-list.query'

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

export const refreshAppListAction = () => revalidateTag(CACHE_TAGS.PAGE_LIST)
