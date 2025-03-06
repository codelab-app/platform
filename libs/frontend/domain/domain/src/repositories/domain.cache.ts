'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { revalidateTag } from 'next/cache'

export const invalidateDomainListQuery = async () =>
  revalidateTag(CACHE_TAGS.DOMAIN_LIST)
