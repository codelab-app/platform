import { Dashboard } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'

const Layout = ({
  children,
  header,
  primarySidebar,
}: {
  children: ReactNode
  header: ReactNode
  primarySidebar: ReactNode
}) => {
  return (
    <Dashboard
      Header={header}
      PrimarySidebar={primarySidebar}
      contentStyles={{ paddingTop: '0rem' }}
    >
      {children}
    </Dashboard>
  )
}

export default Layout
