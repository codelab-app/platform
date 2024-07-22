'use client'

import { RendererType } from '@codelab/frontend/abstract/application'
import type { IComponentDevelopmentDto } from '@codelab/frontend/abstract/domain'
import { useComponentDev } from '@codelab/frontend-application-component/use-cases/component-development'
import React from 'react'
import { Builder } from '../base-builder'

interface ComponentPreviewProps {
  componentSlug: string
  dto: IComponentDevelopmentDto
}

export const ComponentBuilder = (props: ComponentPreviewProps) => {
  useComponentDev({
    ...props,
    rendererType: RendererType.Preview,
  })

  return <Builder />
}
