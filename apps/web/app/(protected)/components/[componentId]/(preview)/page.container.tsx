'use client'

import { RendererType } from '@codelab/frontend/abstract/application'
import { ComponentBuilder } from '@codelab/frontend-application-builder/use-cases/component-builder'
import { PageBuilder } from '@codelab/frontend-application-builder/use-cases/page-builder'
import { useComponentService } from '@codelab/frontend-application-component/services'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { observer } from 'mobx-react-lite'

export const ComponentPreviewBuilderContainer = observer(
  ({ componentId }: { componentId: string }) => {
    const component = useComponentService().getOneFromCache({ id: componentId })

    return (
      <ComponentBuilder
        RootRenderer={RootRenderer}
        component={component}
        rendererType={RendererType.Preview}
      />
    )
  },
)
