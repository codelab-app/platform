'use client'

import type { IComponentBuilderRoute } from '@codelab/frontend-abstract-application'

import { ComponentConnector } from '@codelab/frontend-infra-connector'

import { ComponentBuilderPrimarySidebar } from './ComponentBuilderPrimarySidebar'

export const ComponentBuilderPrimarySidebarContainer = ({
  context,
}: {
  context: IComponentBuilderRoute
}) => {
  const {
    params: { componentId },
  } = context

  return (
    <ComponentConnector id={componentId}>
      {(component) => (
        <ComponentBuilderPrimarySidebar
          component={component}
          context={context}
        />
      )}
    </ComponentConnector>
  )
}
