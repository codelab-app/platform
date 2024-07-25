'use client'

import { RendererType } from '@codelab/frontend/abstract/application'
import { RootRenderer } from '@codelab/frontend-application-renderer/components'
import React from 'react'
import { useInitializeBuilder } from '../../services'

export const BuilderPreview = ({ pageSlug }: { pageSlug: string }) => {
  const { renderer } = useInitializeBuilder({
    pageSlug,
    rendererType: RendererType.Preview,
  })

  return <RootRenderer renderer={renderer} />
}
