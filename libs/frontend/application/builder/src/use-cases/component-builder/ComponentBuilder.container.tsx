'use client'

import { RendererType } from '@codelab/frontend/abstract/application'
import { ComponentConnector } from '@codelab/frontend/infra/connector'
import { BuilderProvider } from '@codelab/frontend/presentation/container'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

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
