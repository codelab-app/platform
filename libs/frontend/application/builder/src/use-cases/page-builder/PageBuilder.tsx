'use client'

import { RendererType } from '@codelab/frontend/abstract/application'
import type { IAppDevelopmentDto } from '@codelab/frontend/abstract/domain'
import type { GetAppDevelopmentQuery } from '@codelab/frontend/infra/gql'
import {
  hydrateAppDevelopment,
  useAppDev,
} from '@codelab/frontend-application-app/use-cases/app-development'
import React from 'react'
import { Builder } from '../base-builder'

export const PageBuilder = async ({
  dto,
  pageSlug,
}: {
  dto: IAppDevelopmentDto
  pageSlug: string
}) => {
  await useAppDev({
    dto,
    pageSlug,
    rendererType: RendererType.PageBuilder,
  })

  return <Builder />
}
