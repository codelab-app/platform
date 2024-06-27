import type { PropsWithChildren } from 'react'
import React from 'react'
import { Providers } from '../../components'

const Layout = async ({ children }: PropsWithChildren) => {
  return <Providers>{children}</Providers>
}

export default Layout
