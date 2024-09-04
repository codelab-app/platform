'use client'

import type { NameFilter } from '@codelab/frontend/abstract/application'
import type {
  SearchParams,
  SearchParamsString,
  UrlParams,
} from '@codelab/frontend/abstract/types'
import {
  usePaginationQuery,
  useSearchQuery,
} from '@codelab/frontend-application-shared-store/pagination'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { type ReactNode, useEffect, useState } from 'react'

interface ApplicationStoreHydratorProps {
  children: ReactNode
  fallback: ReactNode
  params?: UrlParams
  searchParams?: SearchParamsString
}

export const ApplicationStoreHydrator = observer<ApplicationStoreHydratorProps>(
  ({ children, fallback, params, searchParams }) => {
    const { routerService } = useApplicationStore()
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
      if (searchParams) {
        routerService.setSearchParams({
          ...searchParams,
          page: searchParams.page ? parseInt(searchParams.page) : null,
          pageSize: searchParams.pageSize
            ? parseInt(searchParams.pageSize)
            : null,
        })
      }

      if (params) {
        routerService.setParams(params)
      }

      setIsHydrated(true)
    }, [])

    return isHydrated ? <>{children}</> : <>{fallback}</>
  },
)
