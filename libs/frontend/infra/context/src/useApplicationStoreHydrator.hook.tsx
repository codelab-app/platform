'use client'

import type { NextjsSearchParamsProps } from '@codelab/frontend-abstract-application'

import { useApplicationStore } from '@codelab/frontend-infra-mobx-context'

export const useApplicationStoreHydrator = () => {
  const { routerService } = useApplicationStore()

  const hydrate = ({
    searchParams,
  }: {
    searchParams?: NextjsSearchParamsProps
  }) => {
    if (searchParams) {
      routerService.setSearchParams(searchParams)
    }
  }

  return hydrate
}
