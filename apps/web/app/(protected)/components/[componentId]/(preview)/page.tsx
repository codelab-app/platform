import type { Metadata } from 'next'

import { RendererType } from '@codelab/frontend/abstract/application'
import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { ComponentBuilder } from '@codelab/frontend-application-builder/use-cases/component-builder'
import { componentBuilderQuery } from '@codelab/frontend-application-component/use-cases/component-builder'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { getNameFromSlug } from '@codelab/shared/utils'

import { ComponentPreviewBuilderContainer } from './page.container'

export const metadata: Metadata = {
  title: 'Component Preview | Codelab',
}

const ComponentPreviewPage = async ({
  params: { componentId },
}: {
  params: {
    componentId: string
  }
}) => {
  const dto = await componentBuilderQuery({ componentId })

  return (
    <DomainStoreHydrator
      actionsDto={dto.actions}
      atomsDto={dto.atoms}
      componentsDto={dto.components}
      elementsDto={dto.elements}
      fallback={<Spinner />}
      fieldsDto={dto.fields}
      propsDto={dto.props}
      resourcesDto={dto.resources}
      storesDto={dto.stores}
      tagsDto={dto.tags}
      typesDto={dto.types}
    >
      <ComponentPreviewBuilderContainer componentId={componentId} />
    </DomainStoreHydrator>
  )
}

export default ComponentPreviewPage
