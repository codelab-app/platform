import { RootProviders } from '@codelab/frontend/infra/context'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { ApplicationStoreProvider } from '@codelab/frontend-infra-mobx/store'
import type { ReactNode } from 'react'
import React from 'react'

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getServerUser()

  return <RootProviders user={user}>{children}</RootProviders>
}

export default ProtectedLayout
