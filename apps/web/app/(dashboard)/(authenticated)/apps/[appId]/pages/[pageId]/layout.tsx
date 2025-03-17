import type { PageContextParams } from '@codelab/frontend/abstract/types'
import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { appBuilderQuery } from '@codelab/frontend-application-app/use-cases/app-builder'
import { pageRepository } from '@codelab/frontend-domain-page/repositories'

/**
 * The `appBuilderQuery` is shared between `preview` and `builder`, so can be cached in layout.
 *
 * Hydration is done in `LayoutClient`
 */
const Layout = async (props: {
  children: ReactNode
  params: Promise<PageContextParams>
}) => {
  const params = await props.params
  const { children } = props
  const { appId, pageId } = params
  const dto = await appBuilderQuery({ appId, pageIds: [pageId] })

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <DomainStoreHydrator {...dto}>{children}</DomainStoreHydrator>
}

export default Layout
