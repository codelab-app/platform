import { StoreHydrator } from '@codelab/frontend/infra/context'
import { appBuilderQuery } from '@codelab/frontend-application-app/use-cases/app-builder'
import { PageBuilder } from '@codelab/frontend-application-builder/use-cases/page-builder'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import React from 'react'

const PageBuilderPage = async ({
  params: { appId, pageId },
}: {
  params: {
    pageId: string
    appId: string
  }
}) => {
  const dto = await appBuilderQuery({ appId })

  return (
    <StoreHydrator
      actionsDto={dto.actions}
      appsDto={[dto.app]}
      atomsDto={dto.atoms}
      authGuardsDto={dto.authGuards}
      componentsDto={dto.components}
      elementsDto={dto.elements}
      fallback={<Spinner center isLoading />}
      fieldsDto={dto.fields}
      pagesDto={dto.pages}
      propsDto={dto.props}
      redirectsDto={dto.redirects}
      resourcesDto={dto.resources}
      storesDto={dto.stores}
      typesDto={dto.types}
    >
      {/* Decouple renderer from builder */}
      <></>
      {/* <PageBuilder RootRenderer={RootRenderer} pageId={pageId} /> */}
    </StoreHydrator>
  )
}

export default PageBuilderPage
