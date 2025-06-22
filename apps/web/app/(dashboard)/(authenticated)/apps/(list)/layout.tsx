import type { DashboardLayoutProps } from '@codelab/frontend-abstract-types'

import { preloadAppListQuery } from '@codelab/frontend-application-app/use-cases/app-list'
import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'

const Layout = ({
  children,
  header,
  modal,
}: DashboardLayoutProps<'header' | 'modal', never>) => {
  preloadAppListQuery()

  return (
    <DashboardLayout<'header' | 'modal'> header={header} modal={modal}>
      {children}
    </DashboardLayout>
  )
}

export default Layout
