'use client'

import type { SearchParamsProps } from '@codelab/frontend/abstract/types'

import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'

export const useApplicationStoreHydrator = () => {
  const { routerService } = useApplicationStore()

  const hydrate = ({ searchParams }: { searchParams?: SearchParamsProps }) => {
    if (searchParams) {
      routerService.setSearchParams(searchParams)
    }
  }

  return hydrate
}
