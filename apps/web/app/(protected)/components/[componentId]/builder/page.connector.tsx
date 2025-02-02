'use client'

import { ComponentBuilder } from '@codelab/frontend-application-builder/use-cases/component-builder'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

export const ComponentBuilderConnector = observer(
  ({ componentId }: { componentId: string }) => {
    const { componentDomainService } = useDomainStore()
    const component = componentDomainService.component(componentId)

    return (
      <ComponentBuilder RootRenderer={RootRenderer} component={component} />
    )
  },
)
