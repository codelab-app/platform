'use client'

import { RendererType } from '@codelab/frontend/abstract/application'
import { ComponentBuilder } from '@codelab/frontend-application-builder/use-cases/component-builder'
import { useComponentService } from '@codelab/frontend-application-component/services'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { observer } from 'mobx-react-lite'

export const ComponentBuilderContainer = observer(
  ({ componentId }: { componentId: string }) => {
    const component = useComponentService().getOneFromCache({ id: componentId })

    return (
      <ComponentBuilder
        RootRenderer={RootRenderer}
        component={component}
        rendererType={RendererType.ComponentBuilder}
      />
    )
  },
)
