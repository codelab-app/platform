'use client'

import LeftOutlined from '@ant-design/icons/LeftOutlined'
import RightOutlined from '@ant-design/icons/RightOutlined'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import type {
  Filterables,
  IPaginateable,
  SupportedPaginationModel,
  SupportedPaginationModelPage,
} from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import { useTablePagination } from '@codelab/frontend-application-shared-store/pagination'
import React, { useEffect, useState } from 'react'
import type { ToolbarItem } from '../../abstract'
import { CuiInput } from '../../components'

export const useToolbarPagination = <
  T extends SupportedPaginationModel,
  U extends Filterables,
>(
  service: IPaginateable<T, U>,
  pathname: SupportedPaginationModelPage,
  filterTypes: Record<keyof U, 'boolean' | 'number' | 'string' | 'string[]'>,
) => {
  const paginationService = service.paginationService

  const { handleChange, pagination } = useTablePagination<T, U>({
    filterTypes,
    paginationService,
    pathname,
  })

  const { current, pageSize } = pagination
  const [currentPage, setCurrentPage] = useState(current ?? 1)
  const [currentPageSize, setCurrentPageSize] = useState(pageSize ?? 50)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const pageCount = Math.ceil(paginationService.totalItems / currentPageSize)

  useEffect(() => {
    if (current) {
      setCurrentPage(current)
    }

    if (pageSize) {
      setCurrentPageSize(pageSize)
    }
  }, [current, pageSize])

  const changePageSize = (newPageSize: number) => {
    setCurrentPageSize(newPageSize)
    void handleChange({ newPageSize })
  }

  const goToPage = (page: number) => {
    if (page > 0 && page <= pageCount) {
      setCurrentPage(page)
      void handleChange({ newPage: page })
    }
  }

  const goToPreviousPage = () => {
    goToPage(currentPage - 1)
  }

  const goToNextPage = () => {
    goToPage(currentPage + 1)
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
                goToPage(value)
              }
            }}
            selectAllOnClick
            type="number"
            value={currentPage}
          />
          <span className="m-0 w-2 p-0 text-center text-sm">/</span>
          <span className="m-0 w-6 p-0 text-center text-sm">{`${pageCount}`}</span>
        </div>
      ),
      title: `Current page: ${currentPage} / ${pageCount}`,
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
        <div className="flex w-16 flex-row items-center justify-between">
          <CuiInput
            onChange={(value) => {
              if (typeof value === 'number' && value > 0) {
                changePageSize(value)
              }
            }}
            selectAllOnClick
            type="number"
            value={currentPageSize}
          />
          <span className="m-0 w-2 p-0 text-sm">/</span>
          <span className="m-0 p-0 text-sm">Page</span>
        </div>
      ),
      title: `${currentPageSize} items per page`,
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
