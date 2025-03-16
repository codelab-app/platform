'use client'

import { RendererType } from '@codelab/frontend/abstract/application'
import { BuilderProvider } from '@codelab/frontend/presentation/container'
import { ComponentConnector } from '@codelab/frontend-application-component/views'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

import { ComponentBuilder } from './ComponentBuilder'

export const ComponentPreviewBuilderContainer = observer(
  ({ componentId }: { componentId: string }) => {
    return (
      <ComponentConnector id={componentId}>
        {(component) => (
          <BuilderProvider
            containerNode={component}
            rendererType={RendererType.Preview}
          >
            <ComponentBuilder
              RootRenderer={RootRenderer}
              component={component}
            />
          </BuilderProvider>
        )}
      </ComponentConnector>
    )
  },
)
