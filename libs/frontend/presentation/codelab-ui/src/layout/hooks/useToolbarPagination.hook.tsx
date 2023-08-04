import { LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons'
import type {
  Filterables,
  IPaginateable,
  SupportedPaginationModel,
  SupportedPaginationModelPage,
} from '@codelab/frontend/abstract/core'
import { useTablePagination } from '@codelab/frontend/shared/utils'
import React, { useEffect, useState } from 'react'
import { CuiInput } from '../../components'

export const useToolbarPagination = <
  T extends SupportedPaginationModel,
  U extends Filterables,
>(
  service: IPaginateable<T, U>,
  pathname: SupportedPaginationModelPage,
  filterTypes?: Record<keyof U, 'boolean' | 'number' | 'string' | 'string[]'>,
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

  const items = [
    {
      icon: <LeftOutlined />,
      key: 'previous',
      onClick: goToPreviousPage,
      title: 'Previous',
    },
    {
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
      key: 'current-page',
      title: `Current page: ${currentPage} / ${pageCount}`,
    },
    {
      icon: <RightOutlined />,
      key: 'next',
      onClick: goToNextPage,
      title: 'Next',
    },
    {
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
      key: 'page-size',
      title: `${currentPageSize} items per page`,
    },
    {
      icon: <SearchOutlined />,
      key: 'search',
      onClick: () => setShowSearchBar(!showSearchBar),
      title: 'Search',
    },
  ]

  return { items, showSearchBar }
}
