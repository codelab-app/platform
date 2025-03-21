'use client'

import type {
  SearchParamsPageProps,
  SearchParamsProps,
} from '@codelab/frontend/abstract/types'
import type { PropsWithChildren } from 'react'

import {
  parseSearchParamsPageProps,
  useSearchParamsProps,
} from '@codelab/frontend-application-shared-store/router'
import { observer } from 'mobx-react-lite'
import { useDeepCompareEffect } from 'react-use'

import { useApplicationStoreHydrator } from './useApplicationStoreHydrator.hook'

export const SearchParamsHydrator = observer<{
  children: React.ReactNode
  searchParams: SearchParamsPageProps
}>(({ children, searchParams }) => {
  const hydrate = useApplicationStoreHydrator()

  useDeepCompareEffect(() => {
    hydrate({ searchParams: parseSearchParamsPageProps(searchParams) })
  }, [searchParams])

  return <>{children}</>
})
