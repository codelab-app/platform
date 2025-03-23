'use server'

import { CACHE_TAGS } from '@codelab/frontend-application-shared-store/cache'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { componentServerActions } from '@codelab/shared-domain-module/component'
import { revalidateTag } from 'next/cache'

const { ComponentList } = componentServerActions

export const componentListQuery = async () => {
  const { id } = await getServerUser()

  return await ComponentList({
    where: { owner: { id } },
  })
}

export const revalidateComponentListOperation = async () =>
  revalidateTag(CACHE_TAGS.COMPONENTS_LIST)
