import type { ReactNode } from 'react'

import { RootProviders } from '@codelab/frontend/infra/context'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { preferenceQuery } from '@codelab/frontend-domain-preference/repositories'

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getServerUser()
  const preferenceDto = await preferenceQuery({ owner: user })

  return (
    <RootProviders preference={preferenceDto} user={user}>
      {children}
    </RootProviders>
  )
}

export default ProtectedLayout
