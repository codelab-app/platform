'use server'

import { CACHE_TAGS } from '@codelab/frontend-application-shared-store/cache'
import { revalidateTag } from 'next/cache'

export const invalidateAppListQuery = async () => {
  revalidateTag(CACHE_TAGS.APP_LIST)
}
