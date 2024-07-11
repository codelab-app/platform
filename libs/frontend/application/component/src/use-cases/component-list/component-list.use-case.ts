'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { atomListAction } from '@codelab/frontend-domain-atom/actions'
import { componentListAction } from '@codelab/frontend-domain-component/actions'
import { revalidateTag } from 'next/cache'

export const componentListUseCase = async () => {
  const owner = await getServerUser()

  return await componentListAction({
    where: { owner },
  })
}

export const atomListUseCase = async () => {
  const owner = await getServerUser()

  return await atomListAction({
    where: { owner },
  })
}

export const refreshComponentListAction = () =>
  revalidateTag(CACHE_TAGS.COMPONENTS_LIST)
