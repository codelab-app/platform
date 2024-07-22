'use client'

import { RendererType } from '@codelab/frontend/abstract/application'
import type { IComponentDevelopmentDto } from '@codelab/frontend/abstract/domain'
import { RootRenderer } from '@codelab/frontend-application-renderer/components'
import React from 'react'
import { useComponentDev } from './useComponentDevelopment.hook'

interface ComponentPreviewProps {
  componentSlug: string
  dto: IComponentDevelopmentDto
}

export const ComponentPreview = (props: ComponentPreviewProps) => {
  const { renderer } = useComponentDev({
    ...props,
    rendererType: RendererType.Preview,
  })

  return <RootRenderer renderer={renderer} />
}
