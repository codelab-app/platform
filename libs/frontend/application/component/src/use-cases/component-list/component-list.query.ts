'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { ComponentList } from '@codelab/frontend-domain-component/repositories'
import { revalidateTag } from 'next/cache'

export const componentListQuery = async () => {
  const owner = await getServerUser()

  return await ComponentList({
    where: { owner },
  })
}

export const revalidateComponentListOperation = () =>
  revalidateTag(CACHE_TAGS.COMPONENTS_LIST)
