'use server'

import {
  CACHE_TAGS,
  type IDomainModel,
} from '@codelab/frontend/abstract/domain'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { appListRepository } from '@codelab/frontend-domain-app/repositories'
import type { IApp } from '@codelab/shared/abstract/core'
import { AppProperties } from '@codelab/shared/domain'
import { revalidateTag } from 'next/cache'

export const domainListUseCase = async (app: Pick<IApp, 'slug'>) => {
  const user = await getServerUser()
  const compositeKey = AppProperties.appCompositeKey(app, user)

  const { apps } = await appListRepository({
    compositeKey,
  })

  const domains = apps.flatMap((_app) => _app.domains)

  return { apps, domains }
}

export const invalidateDomainListQuery = () =>
  revalidateTag(CACHE_TAGS.APP_LIST)
