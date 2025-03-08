'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { revalidateTag } from 'next/cache'

export const invalidateStoreListQuery = async () =>
  revalidateTag(CACHE_TAGS.STORE_LIST)
