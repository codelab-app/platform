'use client'

import { RendererType } from '@codelab/frontend/abstract/application'
import type { IAppDevelopmentDto } from '@codelab/frontend/abstract/domain'
import { useAppDev } from '@codelab/frontend-application-app/use-cases/app-development'
import { RootRenderer } from '@codelab/frontend-application-renderer/components'
import React from 'react'

export const PagePreview = ({
  dto,
  pageSlug,
}: {
  pageSlug: string
  dto: IAppDevelopmentDto
}) => {
  const { renderer } = useAppDev({
    dto,
    pageSlug,
    rendererType: RendererType.Preview,
  })

  return <RootRenderer renderer={renderer} />
}
