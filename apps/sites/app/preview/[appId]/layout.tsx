import type { ReactNode } from 'react'

import { RootProviders } from '../../../providers/RootProviders'

export const Layout = ({ children }: { children: ReactNode }) => {
  return <RootProviders>{children}</RootProviders>
}

export default Layout
