import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import type { GetDomainsQueryVariables } from '@codelab/frontend/infra/gql'
import { execute } from '@codelab/frontend/infra/gql'
import type { IDomainDto } from '@codelab/shared/abstract/core'
import { revalidateTag } from 'next/cache'
import { GetDomainsListQuery } from './get-domains.query'

export const getDomainsAction = async ({
  options,
  where,
}: GetDomainsQueryVariables): Promise<{ domains: Array<IDomainDto> }> => {
  const { items: domains } = await execute(
    GetDomainsListQuery,
    {
      options,
      where,
    },
    { tags: [CACHE_TAGS.DOMAIN_LIST] },
  )

  return { domains }
}

export const refreshDomainListAction = () =>
  revalidateTag(CACHE_TAGS.DOMAIN_LIST)
