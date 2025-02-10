'use client'

import { RendererType } from '@codelab/frontend/abstract/application'
import { BuilderProvider } from '@codelab/frontend/presentation/container'
import { ComponentBuilder } from '@codelab/frontend-application-builder/use-cases/component-builder'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

export const ComponentPreviewBuilderConnector = observer(
  ({ componentId }: { componentId: string }) => {
    const { componentDomainService } = useDomainStore()
    const component = componentDomainService.components.get(componentId)

    if (!component) {
      return <Spinner />
    }

    return (
      <BuilderProvider
        containerNode={component}
        rendererType={RendererType.Preview}
      >
        <ComponentBuilder RootRenderer={RootRenderer} component={component} />
      </BuilderProvider>
    )
  },
)
