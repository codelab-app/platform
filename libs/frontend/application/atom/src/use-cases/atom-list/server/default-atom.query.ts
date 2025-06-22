import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { AtomType } from '@codelab/shared-infra-gqlgen'
import { cache } from 'react'
import 'server-only'

/**
 * Cache is used to de-dup request within the same server call
 */
export const defaultAtomQuery = cache(async () => {
  const owner = await getServerUser()

  return await atomRepository.find({
    owner: { id: owner.id },
    type: AtomType.ReactFragment,
  })
})
