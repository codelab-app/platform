import { StoreHydrator } from '@codelab/frontend/infra/context'
import { ComponentBuilderPreview } from '@codelab/frontend-application-builder/use-cases/component-builder-preview'
import { componentBuilderQuery } from '@codelab/frontend-application-component/use-cases/component-builder'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { getNameFromSlug } from '@codelab/shared/utils'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Component Preview | Codelab',
}

const ComponentPreviewPage = async ({
  params: { componentSlug },
}: {
  params: {
    componentSlug: string
  }
}) => {
  const user = await getServerUser()
  const componentName = getNameFromSlug(componentSlug)
  const dto = await componentBuilderQuery({ componentName })

  return (
    <StoreHydrator
      actionsDto={dto.actions}
      atomsDto={dto.atoms}
      componentsDto={dto.components}
      elementsDto={dto.elements}
      fallback={<Spinner center isLoading />}
      fieldsDto={dto.fields}
      propsDto={dto.props}
      resourcesDto={dto.resources}
      storesDto={dto.stores}
      typesDto={dto.types}
    >
      <ComponentBuilderPreview
        RootRenderer={RootRenderer}
        componentSlug={componentSlug}
      />
    </StoreHydrator>
  )
}

export default ComponentPreviewPage
