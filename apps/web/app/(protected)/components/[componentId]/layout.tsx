import type {
  ComponentContextParams,
  PageContextParams,
} from '@codelab/frontend/abstract/types'
import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { appBuilderQuery } from '@codelab/frontend-application-app/use-cases/app-builder'
import { componentBuilderQuery } from '@codelab/frontend-application-component/use-cases/component-builder'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { LayoutClient } from './layout.client'

/**
 * The `appBuilderQuery` is shared between `preview` and `builder`, so can be cached in layout.
 *
 * Hydration is done in `LayoutClient`
 */
const Layout = async (props: {
  children: ReactNode
  params: Promise<ComponentContextParams>
}) => {
  const params = await props.params
  const { children } = props
  const { componentId } = params
  const dto = await componentBuilderQuery({ componentId })

  return (
    <LayoutClient componentId={componentId} dto={dto}>
      {children}
    </LayoutClient>
  )
}

export default Layout
