import type { DashboardLayoutProps } from '@codelab/frontend-presentation-view/templates'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { appBuilderQuery } from '@codelab/frontend-application-app/use-cases/app-builder'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'

import { LayoutClient } from './layout.client'

type LayoutProps = DashboardLayoutProps<'header', 'pageId'>

const Layout = async ({ children, header, params }: LayoutProps) => {
  const { appId, pageId } = params
  const dto = await appBuilderQuery({ appId })

  return (
    <LayoutClient pageId={pageId}>
      <DashboardLayout<'header', 'pageId'> header={header} params={params}>
        {children}
      </DashboardLayout>
    </LayoutClient>
  )
}

export default Layout
