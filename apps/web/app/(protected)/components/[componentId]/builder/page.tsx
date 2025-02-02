import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import {
  ApplicationStoreHydrator,
  DomainStoreHydrator,
} from '@codelab/frontend/infra/context'
import { componentBuilderQuery } from '@codelab/frontend-application-component/use-cases/component-builder'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { ComponentBuilderConnector } from './page.connector'

export const metadata: Metadata = {
  title: 'Component Builder | Codelab',
}

const ComponentBuilderPage = async (
  props0: {
    params: Promise<{
      componentId: string
    }>
  }
) => {
  const params = await props0.params;

  const {
    componentId
  } = params;

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
      <ComponentBuilderConnector componentId={componentId} />
    </DomainStoreHydrator>
  )
}

export default ComponentBuilderPage
