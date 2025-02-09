'use client'

import type { SearchParamsProps } from '@codelab/frontend/abstract/types'

import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'

/**
 * This allows a non-blocking version of router hydration
 *
 * Need to make sure we are conditionally rendering components that require router state
 */
export const useApplicationStoreHydrator = () => {
  const { routerService } = useApplicationStore()
  // /**
  //  * We use a ref here instead of state to avoid triggering a re-render when hydrating.
  //  *
  //  * The ref allows us to store the searchParams and access them in the useEffect, while preventing the "setState during render" error that would occur if we tried to update router state directly during component render.
  //  */
  // const hydrateRef = useRef<SearchParamsProps | null>(null)

  const hydrate = ({ searchParams }: { searchParams: SearchParamsProps }) => {
    routerService.setSearchParams(searchParams)
  }

  // useEffect(() => {
  //   if (hydrateRef.current) {
  //     routerService.setSearchParams(hydrateRef.current)
  //   }
  // }, [routerService])

  return hydrate
}
