'use client'

import {
  type IRootRenderer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import React from 'react'
import { useInitializeBuilder } from '../../services'
import { BaseBuilder } from '../base-builder'

interface IComponentBuilderPreviewProps {
  RootRenderer: IRootRenderer
  componentSlug: string
}

export const ComponentBuilderPreview = ({
  componentSlug,
  RootRenderer,
}: IComponentBuilderPreviewProps) => {
  const { componentDomainService } = useDomainStore()
  const component = componentDomainService.findBySlug(componentSlug)

  const { renderer } = useInitializeBuilder({
    containerNode: component,
    rendererType: RendererType.Preview,
  })

  return <BaseBuilder RootRenderer={RootRenderer} renderer={renderer} />
}
