'use client'

import type {
  IPaginationSearchParams,
  SupportedPaginationPathname,
} from '@codelab/frontend/abstract/application'

import SearchOutlined from '@ant-design/icons/SearchOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
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
  const router = useRouter()
  const [showSearchBar, setShowSearchBar] = useState(false)
  // Local React state for immediate UI updates
  const [localPage, setLocalPage] = useState(page)

  // Update local state when prop changes
  useEffect(() => {
    if (page !== localPage) {
      setLocalPage(page)

      // Preload next/prev page
      // const url = `${pathname}?page=${page}&pageSize=${pageSize}&${filter}`

      // router.prefetch(url)
    }
  }, [page, pageSize])

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
