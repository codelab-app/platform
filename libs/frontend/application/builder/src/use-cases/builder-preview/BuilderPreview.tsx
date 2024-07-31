'use client'

import {
  type IRootRenderer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import React from 'react'
import { useInitializeBuilder } from '../../services'

interface IBuilderPreviewProps {
  RootRenderer: IRootRenderer
  pageSlug: string
}

export const BuilderPreview = ({
  pageSlug,
  RootRenderer,
}: IBuilderPreviewProps) => {
  const { renderer } = useInitializeBuilder({
    pageSlug,
    rendererType: RendererType.Preview,
  })

  return <>{RootRenderer({ renderer })}</>
}
