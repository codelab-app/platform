import type { ComponentContextParams } from '@codelab/frontend/abstract/application'
import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { componentBuilderQuery } from '@codelab/frontend-application-component/use-cases/component-builder'

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

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <DomainStoreHydrator {...dto}>{children}</DomainStoreHydrator>
}

export default Layout
