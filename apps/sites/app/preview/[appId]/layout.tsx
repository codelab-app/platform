import type { ReactNode } from 'react'

import { RootProviders } from '../../../providers/RootProviders'

const Layout = ({ children }: { children: ReactNode }) => {
  return <RootProviders>{children}</RootProviders>
}

export default Layout
