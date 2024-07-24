import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import {
  type DomainListQueryVariables,
  graphql,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import type { IDomainDto } from '@codelab/shared/abstract/core'
import { revalidateTag } from 'next/cache'
import { domainApi } from './domain.api'

export const domainListRepository = async ({
  options,
  where,
}: DomainListQueryVariables): Promise<{ domains: Array<IDomainDto> }> => {
  const { items: domains } = await domainApi.DomainList(
    {
      options,
      where,
    },
    { tags: [CACHE_TAGS.DOMAIN_LIST] },
  )

  return { domains }
}

export const revalidateDomainListOperation = () =>
  revalidateTag(CACHE_TAGS.DOMAIN_LIST)
