import type { PageContextParams } from '@codelab/frontend/abstract/application'
import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { appBuilderQuery } from '@codelab/frontend-application-app/use-cases/app-builder'

/**
 * The `appBuilderQuery` is shared between `preview` and `builder`, so can be cached in layout.
 *
 * Hydration is done in `LayoutClient`
 */
const Layout = async ({
  children,
  params: paramsPromise,
}: {
  children: ReactNode
  params: Promise<PageContextParams>
}) => {
  const params = await paramsPromise
  const { appId, pageId } = params
  const dto = await appBuilderQuery({ appId, pageIds: [pageId] })

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <DomainStoreHydrator {...dto}>{children}</DomainStoreHydrator>
}

export default Layout
