import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { revalidateTag } from 'next/cache'
import { appListRepository } from './app-list.repository'

export const appListUseCase = async () => {
  const owner = await getServerUser()

  return await appListRepository({
    where: { owner },
  })
}

export const invalidateAppListQuery = () => revalidateTag(CACHE_TAGS.PAGE_LIST)
