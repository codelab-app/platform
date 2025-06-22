'use server'

import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { componentServerActions } from '@codelab/shared-domain-module-component'
import { revalidateTag } from 'next/cache'

const { ComponentList } = componentServerActions

export const componentListQuery = async () => {
  const { id } = await getServerUser()

  return await ComponentList(
    {
      where: { owner: { id } },
    },
    {
      tags: [CACHE_TAGS.Component.list()],
    },
  )
}

export const revalidateComponentListOperation = async () =>
  revalidateTag(CACHE_TAGS.Component.list())
