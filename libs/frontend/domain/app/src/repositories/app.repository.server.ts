'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { revalidateTag } from 'next/cache'

export const invalidateAppListQuery = () => {
  revalidateTag(CACHE_TAGS.APP_LIST)
}
