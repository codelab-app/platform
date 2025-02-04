'use client'

import type { IAppBuilderDto } from '@codelab/frontend/abstract/domain'
import type { ReactNode } from 'react'

import { RendererType } from '@codelab/frontend/abstract/application'
import {
  ApplicationStoreHydrator,
  DomainStoreHydrator,
} from '@codelab/frontend/infra/context'
import { BuilderProvider } from '@codelab/frontend/presentation/container'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

/**
 * Client layout used for hydration and setting provider context
 */
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
    <BuilderProvider containerNode={page} rendererType={RendererType.Preview}>
      {children}
    </BuilderProvider>
  )
}
