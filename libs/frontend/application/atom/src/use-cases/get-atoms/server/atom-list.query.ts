'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { AtomList } from '@codelab/frontend-domain-atom/repositories'

export const atomListQuery = async () => {
  const owner = await getServerUser()

  return await AtomList({ where: { owner } }, { tags: [CACHE_TAGS.ATOM_LIST] })
}
