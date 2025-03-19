'use client'

import type {
  SearchParamsProps,
  UrlParamsProps,
} from '@codelab/frontend/abstract/types'

import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'

export const useApplicationStoreHydrator = () => {
  const { routerService } = useApplicationStore()

  const hydrate = ({
    pathParams,
    searchParams,
  }: {
    searchParams?: SearchParamsProps
    pathParams?: UrlParamsProps
  }) => {
    if (searchParams) {
      routerService.setSearchParams(searchParams)
    }
  }

  return hydrate
}
