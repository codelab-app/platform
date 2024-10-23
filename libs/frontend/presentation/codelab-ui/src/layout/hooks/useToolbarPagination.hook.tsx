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
import { useState } from 'react'

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
    const totalPages = paginationService.totalPages

    const url = queryString.stringifyUrl({
      query: {
        page: Math.min(routerService.page + 1, totalPages),
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
      cuiKey: UiKey.PaginationToolbarItemPreviousPage,
      icon: <LeftOutlined />,
      onClick: goToPreviousPage,
      title: 'Previous',
    },
    {
      cuiKey: UiKey.PaginationToolbarItemCurrentPage,
      icon: (
        <div className="flex flex-row grow">
          <div className="w-10">
            <CuiInput
              onChange={(value) => {
                if (typeof value === 'number' && value > 0) {
                  routerService.setQueryParams({
                    ...routerService.queryParams,
                    page: value,
                  })
                }
              }}
              selectAllOnClick
              type="number"
              value={routerService.page}
            />
          </div>
          <span className="text-center text-sm">/</span>
          <span className="text-center text-sm">{`${paginationService.totalPages}`}</span>
        </div>
      ),
      title: `Current page: ${routerService.page} / ${paginationService.totalPages}`,
    },
    {
      cuiKey: UiKey.PaginationToolbarItemNextPage,
      icon: (
        <div className="flex">
          <RightOutlined />
        </div>
      ),
      onClick: goToNextPage,
      title: 'Next',
    },
    {
      cuiKey: UiKey.PaginationToolbarItemPageSize,
      icon: (
        <div className="flex flex-row items-center justify-between">
          <CuiInput
            onChange={(value) => {
              if (typeof value === 'number' && value > 0) {
                routerService.setQueryParams({
                  ...routerService.queryParams,
                  pageSize: value,
                })
              }
            }}
            selectAllOnClick
            type="number"
            value={routerService.pageSize}
          />
          <span className="text-sm">/</span>
          <span className="text-sm">Page</span>
        </div>
      ),
      title: `${routerService.pageSize} items per page`,
    },
    {
      cuiKey: UiKey.PaginationToobarItemSearch,
      icon: <SearchOutlined />,
      onClick: () => {
        setShowSearchBar(!showSearchBar)
      },
      title: 'Search',
    },
  ]

  return { showSearchBar, toolbarItems }
}
