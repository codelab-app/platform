'use client'

import type { ReactNode } from 'react'

import { RendererType } from '@codelab/frontend/abstract/application'
import { BuilderProvider } from '@codelab/frontend/presentation/container'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useSearchParams } from 'next/navigation'

export const LayoutClient = ({
  children,
  pageId,
}: {
  children: ReactNode
  pageId: string
}) => {
  const { pageDomainService } = useDomainStore()
  const page = pageDomainService.page(pageId)

  return (
    <BuilderProvider
      containerNode={page}
      rendererType={RendererType.PageBuilder}
    >
      {children}
    </BuilderProvider>
  )
}
