'use client'

import type {
  IPaginationService,
  IRouterService,
  SupportedPaginationModel,
} from '@codelab/frontend/abstract/application'

import LeftOutlined from '@ant-design/icons/LeftOutlined'
import RightOutlined from '@ant-design/icons/RightOutlined'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { usePathname, useRouter } from 'next/navigation'
import queryString from 'query-string'
import { useCallback, useEffect, useMemo, useState } from 'react'

import type { ToolbarItem } from '../../abstract'

import { CuiInput } from '../../components'

const getNextPage = (page: number, totalPages: number) =>
  Math.min(page + 1, totalPages)

const getPrevPage = (page: number) => Math.max(page - 1, 1)

/**
 *
 * @param paginationService Must NOT destructure, or else lose reactivity
 * @returns
 */
export const useToolbarPagination = <T extends SupportedPaginationModel>(
  paginationService: IPaginationService<T>,
  routerService: IRouterService,
) => {
  // console.log('useToolbarPagination render', {
  //   page: routerService.page,
  //   pageSize: routerService.pageSize,
  // })
  const router = useRouter()
  const pathname = usePathname()
  const [showSearchBar, setShowSearchBar] = useState(false)

  // Track state changes
  // useEffect(() => {
  //   console.log('Toolbar pagination state changed', {
  //     page: routerService.page,
  //     pageSize: routerService.pageSize,
  //   })
  // }, [routerService.page, routerService.pageSize])

  const getNextPageUrl = (page: number, totalPages: number) => {
    const url = queryString.stringifyUrl({
      query: {
        page: getNextPage(page, totalPages),
      },
      url: pathname,
    })

    return url
  }

  const getPrevPageUrl = (page: number) => {
    const url = queryString.stringifyUrl({
      query: {
        page: getPrevPage(page),
      },
      url: pathname,
    })

    return url
  }

  const goToNextPage = useCallback(() => {
    const url = getNextPageUrl(routerService.page, paginationService.totalPages)

    console.log('go to next', Date.now())
    router.push(url)

    /**
     * Prefetch prev and next page
     */

    const prevPageUrl = getPrevPageUrl(routerService.page)

    const nextPageUrl = getNextPageUrl(
      routerService.page,
      paginationService.totalPages,
    )

    router.prefetch(prevPageUrl)
    router.prefetch(nextPageUrl)

    void paginationService.getData()
  }, [paginationService.totalPages, routerService.page, pathname])

  const goToPreviousPage = useCallback(() => {
    const url = getPrevPageUrl(routerService.page)

    router.push(url)
    void paginationService.getData()
  }, [pathname, routerService.page])

  const handlePageChange = useCallback((value: unknown) => {
    if (typeof value === 'number' && value > 0) {
      routerService.setQueryParams({
        ...routerService.queryParams,
        page: value,
      })
    }
  }, [])

  const handlePageSizeChange = useCallback((value: unknown) => {
    if (typeof value === 'number' && value > 0) {
      routerService.setQueryParams({
        ...routerService.queryParams,
        pageSize: value,
      })
    }
  }, [])

  const handleSearchBarToggle = useCallback(() => {
    setShowSearchBar(!showSearchBar)
  }, [])

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
              onChange={handlePageChange}
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
            onChange={handlePageSizeChange}
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
      onClick: handleSearchBarToggle,
      title: 'Search',
    },
  ]

  return { showSearchBar, toolbarItems }
}
