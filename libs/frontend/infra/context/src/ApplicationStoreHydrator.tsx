'use client'

import type {
  UrlPathParams,
  UrlQueryParamsPageProps,
} from '@codelab/frontend/abstract/types'

import { parseQueryParamPageProps } from '@codelab/frontend-application-shared-store/router'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { type ReactNode, useCallback, useEffect, useState } from 'react'
import { useCustomCompareEffect, useDeepCompareEffect } from 'react-use'
import { isDeepEqual } from 'remeda'

interface ApplicationStoreHydratorProps {
  children: ReactNode
  fallback: ReactNode
  pathParams?: UrlPathParams
  queryParams?: UrlQueryParamsPageProps
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

    useEffect(() => {
      console.log(queryParams)

      if (queryParams) {
        routerService.setQueryParams(parseQueryParamPageProps(queryParams))
      }

      if (pathParams) {
        routerService.setPathParams(pathParams)
      }

      setIsHydrated(true)
    }, [])

    return isHydrated ? <>{children}</> : <>{fallback}</>
  },
)
