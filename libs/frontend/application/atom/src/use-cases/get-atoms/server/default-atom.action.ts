import { AtomType } from '@codelab/frontend/infra/gql'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { atomListRepository } from '@codelab/frontend-domain-atom/repositories'

export const defaultAtomAction = async () => {
  const owner = await getServerUser()

  return await atomListRepository({
    owner,
    type: AtomType.ReactFragment,
  })
}
