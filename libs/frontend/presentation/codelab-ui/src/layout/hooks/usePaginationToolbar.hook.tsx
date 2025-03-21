'use client'

import type {
  IPaginationSearchParams,
  SupportedPaginationPathname,
} from '@codelab/frontend/abstract/application'

import SearchOutlined from '@ant-design/icons/SearchOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import { usePrefetchPaginationRoutes } from '@codelab/frontend-application-shared-store/router'
import { Pagination } from 'antd'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import type { ToolbarItem } from '../../abstract'

export interface ToolbarPaginationProps {
  pathname: SupportedPaginationPathname
  searchParams: IPaginationSearchParams
  totalItems: number
  onPageChange(page: number, pageSize: number): void
}

/**
 * Hook that provides pagination toolbar items without MobX dependencies
 */
export const usePaginationToolbar = ({
  onPageChange,
  pathname,
  searchParams: { filter, page, pageSize },
  totalItems,
}: ToolbarPaginationProps) => {
  const [showSearchBar, setShowSearchBar] = useState(false)
  // Local React state for immediate UI updates
  const [localPage, setLocalPage] = useState(page)

  // Use the prefetch hook
  const { prefetchAdjacentPages } = usePrefetchPaginationRoutes(
    { filter, page, pageSize },
    pathname,
    totalItems,
  )

  // Update local state when prop changes
  useEffect(
    () => {
      if (page !== localPage) {
        setLocalPage(page)

        // Prefetch adjacent pages when page changes
        // prefetchAdjacentPages()
      }
    },
    // Don't include localPage in the dependency array
    [page, pageSize],
  )

  const handlePaginationChange = useCallback(
    (newPage: number, newPageSize: number) => {
      // Optimistic UI update (React state) - happens immediately
      setLocalPage(newPage)

      // Call the provided callback
      setTimeout(() => {
        onPageChange(newPage, newPageSize)
      })
    },
    [onPageChange],
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
          current={localPage}
          onChange={handlePaginationChange}
          pageSize={pageSize}
          showSizeChanger={true}
          simple
          size="small"
          total={totalItems}
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
