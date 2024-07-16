'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { appListRepository } from '@codelab/frontend-application-app/use-cases/app-list'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import type { IApp } from '@codelab/shared/abstract/core'
import { AppProperties } from '@codelab/shared/domain'
import { revalidateTag } from 'next/cache'

export const domainListUseCase = async (app: Pick<IApp, 'slug'>) => {
  const user = await getServerUser()
  const compositeKey = AppProperties.appCompositeKey(app, user)

  return await appListRepository({
    where: { compositeKey },
  })
}

export const invalidateDomainListQuery = () =>
  revalidateTag(CACHE_TAGS.APP_LIST)
