'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { revalidateTag } from 'next/cache'
import { componentListRepository } from './component-list.repository'

export const componentListUseCase = async () => {
  const owner = await getServerUser()

  return await componentListRepository({
    where: { owner },
  })
}

export const refreshComponentListAction = () =>
  revalidateTag(CACHE_TAGS.COMPONENTS_LIST)
