import { ComponentBuilder } from '@codelab/frontend-application-builder/use-cases/component-builder'
import { componentBuilderQuery } from '@codelab/frontend-application-component/use-cases/component-builder'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { getNameFromSlug } from '@codelab/shared/utils'
import type { Metadata } from 'next'
import React from 'react'
import { StoreHydrator } from '../../../../components'

export const metadata: Metadata = {
  title: 'Component Builder | Codelab',
}

const ComponentBuilderPage = async ({
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
      actions={dto.actions}
      atoms={dto.atoms}
      components={dto.components}
      elements={dto.elements}
      fields={dto.fields}
      props={dto.props}
      resources={dto.resources}
      stores={dto.stores}
      types={dto.types}
    >
      <ComponentBuilder
        RootRenderer={RootRenderer}
        componentSlug={componentSlug}
      />
    </StoreHydrator>
  )
}

export default ComponentBuilderPage
