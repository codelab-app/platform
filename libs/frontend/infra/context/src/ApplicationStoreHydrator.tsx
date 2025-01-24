'use client'

import type {
  UrlPathParams,
  URLSeachParamPageProps,
} from '@codelab/frontend/abstract/types'

import { parseQueryParamPageProps } from '@codelab/frontend-application-shared-store/router'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { type ReactNode, useState } from 'react'
import { useCustomCompareEffect } from 'react-use'
import { isDeepEqual } from 'remeda'

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
  pathParams?: UrlPathParams
  queryParams?: URLSeachParamPageProps
}

export const ApplicationStoreHydrator = observer(
  ({
    children,
    fallback,
    pathParams,
    queryParams,
  }: ApplicationStoreHydratorProps) => {
    const { routerService } = useApplicationStore()
    const [isHydrated, setIsHydrated] = useState(false)

    useCustomCompareEffect(
      () => {
        if (queryParams) {
          console.log(parseQueryParamPageProps(queryParams))
          routerService.setQueryParams(parseQueryParamPageProps(queryParams))
        }

        if (pathParams) {
          routerService.setPathParams(pathParams)
        }

        setIsHydrated(true)
      },
      [pathParams, queryParams],
      isDeepEqual,
    )

    // Always wait for hydration, regardless of fallback presence
    if (!isHydrated) {
      return fallback ? <>{fallback}</> : null
    }

    return <>{children}</>
  },
)
