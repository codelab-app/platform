import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { AtomType } from '@codelab/shared/infra/gqlgen'

export const defaultAtomQuery = async () => {
  const owner = await getServerUser()

  return await atomRepository.find({
    owner: { id: owner.id },
    type: AtomType.ReactFragment,
  })
}
