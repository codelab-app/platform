import type { PageContextParams } from '@codelab/frontend/abstract/types'
import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { appBuilderQuery } from '@codelab/frontend-application-app/use-cases/app-builder'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { LayoutClient } from './layout.client'

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
  const dto = await appBuilderQuery({ appId })

  console.log('[pageId] Layout')

  return (
    <LayoutClient dto={dto} pageId={pageId}>
      {children}
    </LayoutClient>
  )
}

export default Layout
