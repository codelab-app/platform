'use client'

import type { IComponentBuilderRoute } from '@codelab/frontend-abstract-application'

import { RendererType } from '@codelab/frontend-abstract-application'
import { ComponentConnector } from '@codelab/frontend-infra-connector'
import { BuilderProvider } from '@codelab/frontend-presentation-container'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'

import { ComponentBuilder } from './ComponentBuilder'

export const ComponentBuilderContainer = ({
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
        <BuilderProvider
          containerNode={component}
          rendererType={RendererType.ComponentBuilder}
        >
          <ComponentBuilder component={component} context={context} />
        </BuilderProvider>
      )}
    </ComponentConnector>
  )
}
