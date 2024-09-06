'use client'

import LeftOutlined from '@ant-design/icons/LeftOutlined'
import RightOutlined from '@ant-design/icons/RightOutlined'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import {
  type IPaginationService,
  type SupportedPaginationModel,
} from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { usePathname, useRouter } from 'next/navigation'
import queryString from 'query-string'
import React, { useState } from 'react'
import type { ToolbarItem } from '../../abstract'
import { CuiInput } from '../../components'

/**
 *
 * @param paginationService Must NOT destructure, or else lose reactivity
 * @returns
 */
export const useToolbarPagination = <T extends SupportedPaginationModel>(
  paginationService: IPaginationService<T>,
) => {
  const { routerService } = useApplicationStore()
  const router = useRouter()
  const pathname = usePathname()
  const [showSearchBar, setShowSearchBar] = useState(false)

  const goToNextPage = () => {
    const url = queryString.stringifyUrl({
      query: {
        page: routerService.page + 1,
      },
      url: pathname,
    })

    router.push(url)
  }

  const goToPreviousPage = () => {
    const url = queryString.stringifyUrl({
      query: {
        page: Math.max(routerService.page - 1, 1),
      },
      url: pathname,
    })

    router.push(url)
  }

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: UiKey.PreviousPagePaginationToolbarItem,
      icon: <LeftOutlined />,
      onClick: goToPreviousPage,
      title: 'Previous',
    },
    {
      cuiKey: UiKey.CurrentPagePaginationToolbarItem,
      icon: (
        <div className="flex w-16 flex-row items-center justify-between">
          <CuiInput
            onChange={(value) => {
              if (typeof value === 'number' && value > 0) {
                routerService.setQueryParams({
                  page: value,
                })
              }
            }}
            selectAllOnClick
            type="number"
            value={routerService.page}
          />
          <span className="m-0 w-2 p-0 text-center text-sm">/</span>
          <span className="m-0 w-6 p-0 text-center text-sm">{`${paginationService.totalPages}`}</span>
        </div>
      ),
      title: `Current page: ${routerService.page} / ${paginationService.totalPages}`,
    },
    {
      cuiKey: UiKey.NextPagePaginationToolbarItem,
      icon: <RightOutlined />,
      onClick: goToNextPage,
      title: 'Next',
    },
    {
      cuiKey: UiKey.PageSizePaginationToolbarItem,
      icon: (
        <div className="flex w-20 flex-row items-center justify-between">
          <CuiInput
            onChange={(value) => {
              if (typeof value === 'number' && value > 0) {
                routerService.setQueryParams({
                  pageSize: value,
                })
              }
            }}
            selectAllOnClick
            type="number"
            value={routerService.pageSize}
          />
          <span className="m-0 w-2 p-1 text-sm">/</span>
          <span className="m-0 p-0 text-sm">Page</span>
        </div>
      ),
      title: `${routerService.pageSize} items per page`,
    },
    {
      cuiKey: UiKey.SearchPaginationToobarItem,
      icon: <SearchOutlined />,
      onClick: () => {
        setShowSearchBar(!showSearchBar)
      },
      title: 'Search',
    },
  ]

  return { showSearchBar, toolbarItems }
}
