import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'
import { revalidateTag } from 'next/cache'
import { getDomainsRepository } from './get-domains.repository'

export const domainListUseCase = async (app: IRef) => {
  return (await getDomainsRepository({ where: { app: { id: app.id } } })).items
}

export const invalidateDomainListQuery = () =>
  revalidateTag(CACHE_TAGS.DOMAIN_LIST)
