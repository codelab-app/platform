import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'

import { parseSearchParamsPageProps } from '@codelab/frontend-application-shared-store/router'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { useCallback } from 'react'

/**
 * This allows a non-blocking version of router hydration
 */
export const useApplicationStoreHydrator = () => {
  const { routerService } = useApplicationStore()

  const hydrate = useCallback(
    ({
      searchParams,
    }: {
      searchParams: SearchParamsPageProps
      // pathParams: PathParamsPageProps
    }) => {
      const params = parseSearchParamsPageProps(searchParams)

      routerService.setSearchParams(params)
    },
    [routerService],
  )

  return hydrate
}
