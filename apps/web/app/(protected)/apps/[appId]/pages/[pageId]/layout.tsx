import type { DashboardLayoutProps } from '@codelab/frontend-presentation-view/templates'

import {
  ApplicationStoreHydrator,
  DomainStoreHydrator,
} from '@codelab/frontend/infra/context'
import { appBuilderQuery } from '@codelab/frontend-application-app/use-cases/app-builder'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'

import { LayoutClient } from './layout.client'

type LayoutProps = DashboardLayoutProps<'header', 'pageId'>

/**
 * The `appBuilderQuery` is shared between `preview` and `builder`, so can be cached in layout.
 *
 * Hydration is done in `LayoutClient`
 */
const Layout = async ({ children, header, params }: LayoutProps) => {
  const { appId, pageId } = params
  const dto = await appBuilderQuery({ appId })

  return (
    <LayoutClient dto={dto} pageId={pageId}>
      <DashboardLayout<'header', 'pageId'> header={header} params={params}>
        {children}
      </DashboardLayout>
    </LayoutClient>
  )
}

export default Layout
