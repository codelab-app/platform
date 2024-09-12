'use client'

import {
  type IRootRenderer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useInitializeBuilder } from '../../services'
import { BaseBuilder } from '../base-builder'

interface IComponentBuilderProps {
  RootRenderer: IRootRenderer
  componentId: string
}

/**
 * Generic builder used for both Component & Element
 */
export const ComponentBuilder = observer<IComponentBuilderProps>(
  ({ componentId, RootRenderer }) => {
    const { componentDomainService } = useDomainStore()
    const component = componentDomainService.component(componentId)

    const { renderer } = useInitializeBuilder({
      containerNode: component,
      rendererType: RendererType.ComponentBuilder,
    })

    return <BaseBuilder RootRenderer={RootRenderer} renderer={renderer} />
  },
)

ComponentBuilder.displayName = 'Builder'
