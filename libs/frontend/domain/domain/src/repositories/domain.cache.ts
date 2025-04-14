'use server'

import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { revalidateTag } from 'next/cache'

export const invalidateDomainListQuery = async () =>
  revalidateTag(CACHE_TAGS.Domain.list())
