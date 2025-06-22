import type { LayoutProps } from '@codelab/frontend-abstract-types'

import { DomainStoreHydrator } from '@codelab/frontend-infra-context'
import { pageBuilderQuery } from '@codelab/frontend-application-builder/use-cases/page-builder'

/**
 * The `pageBuilderQuery` is shared between `preview` and `builder`, so can be cached in layout.
 *
 * Hydration is done in `LayoutClient`
 */
const Layout = async ({
  children,
  params,
}: LayoutProps<'appId' | 'pageId'>) => {
  const { appId, pageId } = await params
  const dto = await pageBuilderQuery({ appId, pageIds: [pageId] })

  return (
    <DomainStoreHydrator
      actionsDto={dto.actions}
      appsDto={[dto.app]}
      atomsDto={dto.atoms}
      authGuardsDto={dto.authGuards}
      componentsDto={dto.components}
      elementsDto={dto.elements}
      fieldsDto={dto.fields}
      pagesDto={dto.pages}
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
