import type React from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import {
  appListQuery,
  preloadAppListQuery,
} from '@codelab/frontend-application-app/use-cases/app-list'
import { Spinner } from 'libs/frontend/presentation/view/src/components/loader'
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
