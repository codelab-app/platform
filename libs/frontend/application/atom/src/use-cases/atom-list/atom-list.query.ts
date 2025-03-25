import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { revalidateTag } from 'next/cache'

export const invalidateAtomTableQuery = () => {
  revalidateTag(CACHE_TAGS.Atom.list())
}
