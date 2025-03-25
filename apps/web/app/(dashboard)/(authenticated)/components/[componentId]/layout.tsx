import type { ComponentContextParams } from '@codelab/frontend/abstract/application'
import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { componentBuilderQuery } from '@codelab/frontend-application-component/use-cases/component-builder'

/**
 * The `componentBuilderQuery` is shared between `preview` and `builder`, so can be cached in layout.
 *
 * Hydration is done in `LayoutClient`
 */
const Layout = async ({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<ComponentContextParams>
}) => {
  const { componentId } = await params
  const dto = await componentBuilderQuery({ componentId })

  return (
    <DomainStoreHydrator
      actionsDto={dto.actions}
      atomsDto={dto.atoms}
      authGuardsDto={dto.authGuards}
      componentsDto={dto.components}
      elementsDto={dto.elements}
      fieldsDto={dto.fields}
      propsDto={dto.props}
      redirectsDto={dto.redirects}
      resourcesDto={dto.resources}
      storesDto={dto.stores}
      tagsDto={dto.tags}
      typesDto={dto.types}
    >
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
