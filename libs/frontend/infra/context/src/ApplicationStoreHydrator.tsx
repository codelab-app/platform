'use client'

import type {
  UrlPathParams,
  UrlQueryParamsString,
} from '@codelab/frontend/abstract/types'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { type ReactNode, useEffect, useState } from 'react'

interface ApplicationStoreHydratorProps {
  children: ReactNode
  fallback: ReactNode
  pathParams?: UrlPathParams
  queryParams?: UrlQueryParamsString
}

export const ApplicationStoreHydrator = observer<ApplicationStoreHydratorProps>(
  ({ children, fallback, pathParams, queryParams }) => {
    const { routerService } = useApplicationStore()
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
      if (queryParams) {
        routerService.setQueryParams({
          ...queryParams,
          page: queryParams.page ? parseInt(queryParams.page) : undefined,
          pageSize: queryParams.pageSize
            ? parseInt(queryParams.pageSize)
            : undefined,
        })
      }

      if (pathParams) {
        routerService.setPathParams(pathParams)
      }

      setIsHydrated(true)
    }, [])

    return isHydrated ? <>{children}</> : <>{fallback}</>
  },
)
