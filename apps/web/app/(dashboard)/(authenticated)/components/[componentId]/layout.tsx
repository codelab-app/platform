import type { LayoutProps } from '@codelab/frontend/abstract/types'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { componentBuilderQuery } from '@codelab/frontend-application-component/use-cases/component-builder'

/**
 * The `componentBuilderQuery` is shared between `preview` and `builder`, so can be cached in layout.
 *For the component builder
 * Hydration is done in `LayoutClient`
 */
const Layout = async ({ children, params }: LayoutProps<'componentId'>) => {
  const { componentId } = await params
  const dto = await componentBuilderQuery({ componentId })

  return (
    <DomainStoreHydrator
      actionsDto={dto.actions}
      atomsDto={dto.atoms}
      componentsDto={dto.components}
      elementsDto={dto.elements}
      fieldsDto={dto.fields}
      propsDto={dto.props}
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
