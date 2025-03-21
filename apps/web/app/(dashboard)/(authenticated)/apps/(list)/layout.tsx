import type React from 'react'

import { preloadAppListQuery } from '@codelab/frontend-application-app/use-cases/app-list'
import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'

const Layout = ({
  children,
  header,
  modal,
}: {
  children: React.ReactNode
  header: React.ReactNode
  modal: React.ReactNode
}) => {
  preloadAppListQuery()

  return (
    <DashboardLayout<'header' | 'modal'>
      header={header}
      modal={modal}
      params={{}}
    >
      {children}
    </DashboardLayout>
  )
}

export default Layout
