'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { appListQuery } from '@codelab/frontend-domain-app/repositories'
import type { IApp, IRef } from '@codelab/shared/abstract/core'
import { AppProperties } from '@codelab/shared/domain'
import { revalidateTag } from 'next/cache'

export const domainListQuery = async ({ id }: IRef) => {
  const { items: apps } = await appListQuery({
    id,
  })

  const domains = apps.flatMap((_app) => _app.domains)

  return { apps, domains }
}

export const invalidateDomainListQuery = () =>
  revalidateTag(CACHE_TAGS.APP_LIST)
