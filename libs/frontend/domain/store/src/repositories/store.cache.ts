'use server'

import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { revalidateTag } from 'next/cache'

export const invalidateStoreListQuery = async () =>
  revalidateTag(CACHE_TAGS.StoreList())
