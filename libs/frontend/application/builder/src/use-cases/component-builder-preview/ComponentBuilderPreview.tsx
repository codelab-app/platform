'use client'

import {
  type IRootRenderer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useInitializeBuilder } from '../../services'
import { BaseBuilder } from '../base-builder'

interface IComponentBuilderPreviewProps {
  RootRenderer: IRootRenderer
  componentId: string
}

export const ComponentBuilderPreview = ({
  componentId,
  RootRenderer,
}: IComponentBuilderPreviewProps) => {
  const { componentDomainService } = useDomainStore()
  const component = componentDomainService.component(componentId)

  const { renderer } = useInitializeBuilder({
    containerNode: component,
    rendererType: RendererType.Preview,
  })

  return <BaseBuilder RootRenderer={RootRenderer} renderer={renderer} />
}
