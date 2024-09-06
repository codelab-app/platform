import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { appBuilderQuery } from '@codelab/frontend-application-app/use-cases/app-builder'
import { PageBuilderPreview } from '@codelab/frontend-application-builder/use-cases/page-builder-preview'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import React from 'react'

const PagePreviewPage = async ({
  params: { appId, pageId },
}: {
  params: {
    pageId: string
    appId: string
  }
}) => {
  const dto = await appBuilderQuery({ appId })

  return (
    <DomainStoreHydrator
      actionsDto={dto.actions}
      appsDto={[dto.app]}
      atomsDto={dto.atoms}
      authGuardsDto={dto.authGuards}
      componentsDto={dto.components}
      elementsDto={dto.elements}
      fallback={<Spinner />}
      fieldsDto={dto.fields}
      pagesDto={dto.pages}
      propsDto={dto.props}
      redirectsDto={dto.redirects}
      resourcesDto={dto.resources}
      storesDto={dto.stores}
      typesDto={dto.types}
    >
      {/* Decouple renderer from builder */}
      <PageBuilderPreview RootRenderer={RootRenderer} pageSlug={pageId} />
    </DomainStoreHydrator>
  )
}

export default PagePreviewPage
