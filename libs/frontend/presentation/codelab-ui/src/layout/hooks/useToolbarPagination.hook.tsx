'use client'

import type {
  IPaginationService,
  IRouterService,
  SupportedPaginationModel,
} from '@codelab/frontend/abstract/application'

import SearchOutlined from '@ant-design/icons/SearchOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import { useUpdateSearchParams } from '@codelab/frontend-application-shared-store/router'
import { Pagination } from 'antd'
import { useCallback, useEffect, useState } from 'react'

import type { ToolbarItem } from '../../abstract'

/**
 * @param paginationService Must NOT destructure, or else lose reactivity
 * @returns
 */
export const useToolbarPagination = <T extends SupportedPaginationModel>(
  paginationService: IPaginationService<T>,
  routerService: IRouterService,
) => {
  const [showSearchBar, setShowSearchBar] = useState(false)
  // Local React state for immediate UI updates
  const [page, setPage] = useState(routerService.page)
  const { updateParams } = useUpdateSearchParams()

  // Update local state when MobX state changes (e.g., from external sources)
  useEffect(() => {
    if (routerService.page !== page) {
      setPage(routerService.page)
    }
  }, [routerService.page, page])

  const handlePaginationChange = useCallback(
    (newPage: number, pageSize: number) => {
      // Optimistic UI update (React state) - happens immediately
      setPage(newPage)

      // Queue MobX state update and URL updates to happen after current render
      setTimeout(() => {
        paginationService.setIsLoadingBetweenPages(true)

        // Update URL params first
        updateParams((params) => {
          params.set('page', newPage.toString())
          params.set('pageSize', pageSize.toString())
        })

        // Then update MobX state
        routerService.setSearchParams({
          ...routerService.searchParams,
          page: newPage,
          pageSize,
        })
      })
    },
    [routerService, updateParams],
  )

  const handleSearchBarToggle = useCallback(() => {
    setShowSearchBar((showSearch) => !showSearch)
  }, [])

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: UiKey.PaginationControl,
      icon: (
        <Pagination
          // Use React state for UI rendering
          current={page}
          onChange={handlePaginationChange}
          pageSize={routerService.pageSize}
          showSizeChanger={true}
          simple
          size="small"
          total={paginationService.totalItems}
        />
      ),
    },
    {
      cuiKey: UiKey.PaginationToolbarItemSearch,
      icon: <SearchOutlined />,
      onClick: handleSearchBarToggle,
      title: 'Search',
    },
  ]

  return { showSearchBar, toolbarItems }
}
