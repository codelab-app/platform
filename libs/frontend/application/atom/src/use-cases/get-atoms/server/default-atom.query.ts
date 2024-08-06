import { AtomType } from '@codelab/frontend/infra/gql'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { AtomList } from '@codelab/frontend-domain-atom/repositories'

export const defaultAtomQuery = async () => {
  const owner = await getServerUser()

  return await AtomList({
    where: {
      owner,
      type: AtomType.ReactFragment,
    },
  })
}
