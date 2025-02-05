'use client'

import type { IAppBuilderDto } from '@codelab/frontend/abstract/domain'
import type { ReactNode } from 'react'

import { RendererType } from '@codelab/frontend/abstract/application'
import {
  ApplicationStoreHydrator,
  DomainStoreHydrator,
  useApplicationStoreHydrator,
} from '@codelab/frontend/infra/context'
import { BuilderProvider } from '@codelab/frontend/presentation/container'
import { useSearchParamsProps } from '@codelab/frontend-application-shared-store/router'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { useSearchParams } from 'next/navigation'

/**
 * Hydrate router state at top level layout, make it non-blocking and do conditional check at pages that use the router.
 */
export const LayoutClient = ({ children }: { children: ReactNode }) => {
  console.log('(protected) LayoutClient')

  // const searchParams = useSearchParamsProps()
  // const hydrate = useApplicationStoreHydrator()

  // hydrate({ searchParams })

  return <>{children}</>
}
