import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { atomListRepository } from './atom-list.repository'

export const atomListUseCase = async () => {
  const owner = await getServerUser()

  return await atomListRepository({
    where: { owner },
  })
}
