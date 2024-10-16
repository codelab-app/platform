import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { componentBuilderQuery } from '@codelab/frontend-application-component/use-cases/component-builder'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { ComponentBuilderContainer } from './page.container'

export const metadata: Metadata = {
  title: 'Component Builder | Codelab',
}

const ComponentBuilderPage = async ({
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
      typesDto={dto.types}
    >
      <ComponentBuilderContainer componentId={componentId} />
    </DomainStoreHydrator>
  )
}

export default ComponentBuilderPage
