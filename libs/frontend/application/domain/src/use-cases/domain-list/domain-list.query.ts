'use server'

import type { IRef } from '@codelab/shared/abstract/core'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { appListQuery } from '@codelab/frontend-domain-app/repositories'
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
