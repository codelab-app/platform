import type { PageContextParams } from '@codelab/frontend/abstract/types'

import { RendererType } from '@codelab/frontend/abstract/application'
import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { appBuilderQuery } from '@codelab/frontend-application-app/use-cases/app-builder'
import { PageBuilder } from '@codelab/frontend-application-builder/use-cases/page-builder'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { PageBuilderContainer } from './page.container'

const Page = async ({
  params: { appId, pageId },
}: {
  params: PageContextParams
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
      <PageBuilderContainer pageId={pageId} />
    </DomainStoreHydrator>
  )
}

export default Page
