import type {
  PageContextParams,
  SearchParamsPageProps,
} from '@codelab/frontend/abstract/types'
import type { DashboardLayoutProps } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'

import {
  ApplicationStoreHydrator,
  DomainStoreHydrator,
} from '@codelab/frontend/infra/context'
import { appBuilderQuery } from '@codelab/frontend-application-app/use-cases/app-builder'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'

import { LayoutClient } from './layout.client'

/**
 * The `appBuilderQuery` is shared between `preview` and `builder`, so can be cached in layout.
 *
 * Hydration is done in `LayoutClient`
 */
const Layout = async ({
  children,
  params,
}: {
  children: ReactNode
  params: PageContextParams
}) => {
  const { appId, pageId } = params
  const dto = await appBuilderQuery({ appId })

  console.log('[pageId] Layout')

  return (
    <LayoutClient dto={dto} pageId={pageId}>
      {children}
    </LayoutClient>
  )
}

export default Layout
