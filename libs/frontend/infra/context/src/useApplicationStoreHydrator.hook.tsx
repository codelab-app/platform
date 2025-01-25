'use client'

import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'

import { parseSearchParamsPageProps } from '@codelab/frontend-application-shared-store/router'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { useEffect, useRef } from 'react'

/**
 * This allows a non-blocking version of router hydration
 *
 * Need to make sure we are conditionally rendering components that require router state
 */
export const useApplicationStoreHydrator = () => {
  const { routerService } = useApplicationStore()
  /**
   * We use a ref here instead of state to avoid triggering a re-render when hydrating.
   *
   * The ref allows us to store the searchParams and access them in the useEffect, while preventing the "setState during render" error that would occur if we tried to update router state directly during component render.
   */
  const hydrateRef = useRef<SearchParamsPageProps | null>(null)

  const hydrate = ({
    searchParams,
  }: {
    searchParams: SearchParamsPageProps
  }) => {
    hydrateRef.current = searchParams
  }

  useEffect(() => {
    if (hydrateRef.current) {
      const params = parseSearchParamsPageProps(hydrateRef.current)

      routerService.setSearchParams(params)
    }
  }, [routerService, hydrateRef.current])

  return hydrate
}
