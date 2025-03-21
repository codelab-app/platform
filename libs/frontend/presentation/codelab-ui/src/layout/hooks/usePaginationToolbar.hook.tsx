'use client'

import type {
  IPaginationService,
  SupportedPaginationModel,
} from '@codelab/frontend/abstract/application'
import type { SearchParamsProps } from '@codelab/frontend/abstract/types'

import SearchOutlined from '@ant-design/icons/SearchOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { Pagination } from 'antd'
import { useCallback, useEffect, useState } from 'react'

import type { ToolbarItem } from '../../abstract'

export interface ToolbarPaginationProps {
  searchParams?: SearchParamsProps
  totalItems: number
  onPageChange(page: number, pageSize: number): void
  setIsLoading(isLoading: boolean): void
}

/**
 * Hook that provides pagination toolbar items without MobX dependencies
 */
export const usePaginationToolbar = ({
  onPageChange,
  setIsLoading,
  totalItems,
}: ToolbarPaginationProps) => {
  const { routerService } = useApplicationStore()
  const page = routerService.page
  const pageSize = routerService.pageSize
  const [showSearchBar, setShowSearchBar] = useState(false)
  // Local React state for immediate UI updates
  const [localPage, setLocalPage] = useState(page)

  // Update local state when prop changes
  useEffect(() => {
    if (page !== localPage) {
      setLocalPage(page)
    }
  }, [page, localPage])

  const handlePaginationChange = useCallback(
    (newPage: number, newPageSize: number) => {
      // Optimistic UI update (React state) - happens immediately
      setLocalPage(newPage)
      // setIsLoading(true)

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
