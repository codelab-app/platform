import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { atomListRepository } from '@codelab/frontend-domain-atom/repositories'

export const atomListUseCase = async () => {
  const owner = await getServerUser()

  return await atomListRepository({
    where: { owner },
  })
}
