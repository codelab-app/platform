import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import type { PropsWithChildren } from 'react'
import React from 'react'
import { Providers } from '../../components'

const Layout = async ({ children }: PropsWithChildren) => {
  const user = await getServerUser()

  return <Providers user={user}>{children}</Providers>
}

export default Layout
