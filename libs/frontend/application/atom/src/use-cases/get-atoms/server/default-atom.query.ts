import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { AtomList } from '@codelab/frontend-domain-atom/repositories'
import { AtomType } from '@codelab/shared/infra/gql'

export const defaultAtomQuery = async () => {
  const owner = await getServerUser()

  return await AtomList({
    where: {
      owner,
      type: AtomType.ReactFragment,
    },
  })
}
