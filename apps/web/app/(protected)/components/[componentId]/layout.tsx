import type { ComponentContextParams } from '@codelab/frontend/abstract/types'
import type { ReactNode } from 'react'

import { componentBuilderQuery } from '@codelab/frontend-application-component/use-cases/component-builder'

import { LayoutClient } from './layout.client'

/**
 * The `componentBuilderQuery` is shared between `preview` and `builder`, so can be cached in layout.
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
