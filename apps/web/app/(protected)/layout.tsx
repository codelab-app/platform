import type { ReactNode } from 'react'

import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { preferenceQuery } from '@codelab/frontend-domain-preference/repositories'

import { RootProviders } from '../../providers/RootProviders'

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getServerUser()
  const preferences = await preferenceQuery({ owner: { id: user.id } })

  return (
    <RootProviders user={{ ...user, preferences }}>{children}</RootProviders>
  )
}

ProtectedLayout.displayName = 'ProtectedLayout'

export default ProtectedLayout
