'use server'

import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { appListAction } from '@codelab/frontend-domain-app/actions'

export const appListUseCase = async () => {
  const owner = await getServerUser()

  return await appListAction({
    where: { owner },
  })
}
