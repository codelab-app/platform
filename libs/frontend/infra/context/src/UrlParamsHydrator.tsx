'use client'

import type { PropsWithChildren } from 'react'

import { useSearchParamsProps } from '@codelab/frontend-application-shared-store/router'
import { observer } from 'mobx-react-lite'
import { useDeepCompareEffect } from 'react-use'

import { useApplicationStoreHydrator } from './useApplicationStoreHydrator.hook'

export const UrlParamsHydrator = observer<PropsWithChildren>(({ children }) => {
  const hydrate = useApplicationStoreHydrator()
  const searchParams = useSearchParamsProps()

  useDeepCompareEffect(() => {
    hydrate({ searchParams })
  }, [searchParams])

  return <>{children}</>
})
