import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import type { IAppDto, IAtomDto } from '@codelab/shared/abstract/core'
import { revalidateTag } from 'next/cache'
import { appListAction } from './app-list.action'

export const appListUseCase = async () => {
  const owner = await getServerUser()

  return await appListAction({
    where: { owner },
  })
}

export const refreshAppListAction = () => revalidateTag(CACHE_TAGS.PAGE_LIST)
