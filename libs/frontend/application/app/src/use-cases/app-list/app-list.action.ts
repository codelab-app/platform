'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { appListRepository } from '@codelab/frontend-domain-app/repositories'
import { revalidateTag } from 'next/cache'

export const appListAction = async () => {
  const owner = await getServerUser()

  return await appListRepository({
    owner,
  })
}

export const invalidateAppListQuery = () => revalidateTag(CACHE_TAGS.APP_LIST)
