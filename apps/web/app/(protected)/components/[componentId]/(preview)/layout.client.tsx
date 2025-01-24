'use client'

import type { ReactNode } from 'react'

import { RendererType } from '@codelab/frontend/abstract/application'
import { BuilderProvider } from '@codelab/frontend/presentation/container'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useSearchParams } from 'next/navigation'

export const LayoutClient = ({
  children,
  componentId,
}: {
  children: ReactNode
  componentId: string
}) => {
  const searchParams = useSearchParams()
  const { componentDomainService } = useDomainStore()
  const component = componentDomainService.component(componentId)

  return (
    <BuilderProvider
      containerNode={component}
      rendererType={RendererType.Preview}
      searchParams={searchParams}
    >
      {children}
    </BuilderProvider>
  )
}
