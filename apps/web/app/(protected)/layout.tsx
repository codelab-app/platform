import type { ReactNode } from 'react'

import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { preferenceQuery } from '@codelab/frontend-domain-preference/repositories'

import { RootProviders } from '../../store/RootProviders'

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getServerUser()
  const preferenceDto = await preferenceQuery({ owner: { id: user.id } })

  return (
    <RootProviders preference={preferenceDto} user={user}>
      {children}
    </RootProviders>
  )
}

ProtectedLayout.displayName = 'ProtectedLayout'

export default ProtectedLayout
