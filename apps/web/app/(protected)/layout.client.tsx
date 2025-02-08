'use client'

import type { ReactNode } from 'react'

import { useApplicationStoreHydrator } from '@codelab/frontend/infra/context'
import { useSearchParamsProps } from '@codelab/frontend-application-shared-store/router'

/**
 * Hydrate router state at top level layout, make it non-blocking and do conditional check at pages that use the router.
 */
export const LayoutClient = ({ children }: { children: ReactNode }) => {
  console.log('(protected) LayoutClient')

  const searchParams = useSearchParamsProps()
  const hydrate = useApplicationStoreHydrator()

  hydrate({ searchParams })

  return <>{children}</>
}
