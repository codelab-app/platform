'use client'

import { RendererType } from '@codelab/frontend/abstract/application'
import { BuilderProvider } from '@codelab/frontend/presentation/container'
import { ComponentConnector } from '@codelab/frontend-application-component/views'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'

import { ComponentBuilder } from './ComponentBuilder'

export const ComponentBuilderContainer = ({
  componentId,
}: {
  componentId: string
}) => {
  return (
    <ComponentConnector id={componentId}>
      {(component) => (
        <BuilderProvider
          containerNode={component}
          rendererType={RendererType.ComponentBuilder}
        >
          <ComponentBuilder RootRenderer={RootRenderer} component={component} />
        </BuilderProvider>
      )}
    </ComponentConnector>
  )
}
