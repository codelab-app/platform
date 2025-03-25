import type { PageContextParams } from '@codelab/frontend/abstract/application'
import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { pageBuilderQuery } from '@codelab/frontend-application-builder/use-cases/page-builder'

/**
 * The `pageBuilderQuery` is shared between `preview` and `builder`, so can be cached in layout.
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
