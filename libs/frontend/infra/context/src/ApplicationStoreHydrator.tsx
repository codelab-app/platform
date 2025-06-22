'use client'

import type { NextjsSearchParamsProps } from '@codelab/frontend-abstract-application'

import { observer } from 'mobx-react-lite'
import { type ReactNode, useEffect } from 'react'

import { useApplicationStoreHydrator } from './useApplicationStoreHydrator.hook'

interface ApplicationStoreHydratorProps {
  children: ReactNode
  /**
   * Need to disable fallback in some cases. i.e. after update popover submission, the isHydrated will be false, even though we don't need to hydrate, since update optimistic cache.
   *
   * This will show an unnecessary loading state for data that is already updated
   *
   * The initial motivation is to block children from rendering until data is loaded, perhaps we can push this logic to a callback function instead.
   *
   * In that case we'll need some override to disable loader
   */
  fallback?: ReactNode
  searchParams?: NextjsSearchParamsProps
}

export const ApplicationStoreHydrator = observer<ApplicationStoreHydratorProps>(
  ({ children, searchParams }) => {
    const hydrate = useApplicationStoreHydrator()

    useEffect(() => {
      if (searchParams) {
        hydrate({ searchParams })
      }
    }, [searchParams])

    return <>{children}</>
  },
)

ApplicationStoreHydrator.displayName = 'ApplicationStoreHydrator'
