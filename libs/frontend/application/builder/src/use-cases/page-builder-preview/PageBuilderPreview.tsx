'use client'

import {
  type IRootRenderer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import React from 'react'
import { useInitializeBuilder } from '../../services'
import { BaseBuilder } from '../base-builder'

interface IPageBuilderPreviewProps {
  RootRenderer: IRootRenderer
  pageSlug: string
}

export const PageBuilderPreview = ({
  pageSlug,
  RootRenderer,
}: IPageBuilderPreviewProps) => {
  const { pageDomainService } = useDomainStore()
  const page = pageDomainService.findBySlug(pageSlug)

  const { renderer } = useInitializeBuilder({
    containerNode: page,
    rendererType: RendererType.Preview,
  })

  return <BaseBuilder RootRenderer={RootRenderer} renderer={renderer} />
}
