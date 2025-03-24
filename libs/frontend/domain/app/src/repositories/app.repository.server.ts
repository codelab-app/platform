'use server'

import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { revalidateTag } from 'next/cache'

export const invalidateAppListQuery = async () => {
  revalidateTag(CACHE_TAGS.AppList())
}
