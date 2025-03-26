'use server'

import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { revalidateTag } from 'next/cache'

export const revalidateTypeListCache = async () => {
  await revalidateTag(CACHE_TAGS.Type.list())
}
