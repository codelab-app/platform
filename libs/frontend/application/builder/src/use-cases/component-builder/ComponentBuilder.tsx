'use client'

import {
  type IRootRenderer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useInitializeBuilder } from '../../services'
import { BaseBuilder } from '../base-builder'

interface IComponentBuilderProps {
  RootRenderer: IRootRenderer
  componentSlug: string
}

/**
 * Generic builder used for both Component & Element
 */
export const ComponentBuilder = observer<IComponentBuilderProps>(
  ({ componentSlug, RootRenderer }) => {
    const { componentDomainService } = useDomainStore()
    const component = componentDomainService.findBySlug(componentSlug)

    const { renderer } = useInitializeBuilder({
      containerNode: component,
      rendererType: RendererType.ComponentBuilder,
    })

    return <BaseBuilder RootRenderer={RootRenderer} renderer={renderer} />
  },
)

ComponentBuilder.displayName = 'Builder'
