'use client'

import type {
  IPaginationSearchParams,
  SupportedPaginationPathname,
} from '@codelab/frontend/abstract/application'

import LeftOutlined from '@ant-design/icons/LeftOutlined'
import RightOutlined from '@ant-design/icons/RightOutlined'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import { logTimestampMs } from '@codelab/shared/infra/logging'
import { Button, Pagination } from 'antd'
import Link from 'next/link'
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
 *
 * Will feel slow in development but with production prefetch enabled will be quick. We previously used local state for page and setTimeout to optimize in development, but is not required.
 */
export const usePaginationToolbar = ({
  onPageChange,
  pathname,
  searchParams: { filter, page, pageSize },
  totalItems,
}: ToolbarPaginationProps) => {
  const [showSearchBar, setShowSearchBar] = useState(false)

  const handlePaginationChange = useCallback(
    (newPage: number, newPageSize: number) => {
      logTimestampMs('onPageChange')

      // Wrapping this function under Set Timeout improves the responsiveness in development mode, but is not required for production as we prefetch the pages.
      onPageChange(newPage, newPageSize)
    },
    [onPageChange],
  )

  const handleSearchBarToggle = useCallback(() => {
    setShowSearchBar((showSearch) => !showSearch)
  }, [])

  // Create URLs for next and previous pages
  const createPageUrl = useCallback(
    (pageNum: number) => {
      const urlParams = new URLSearchParams()

      if (filter) {
        urlParams.set('filter', filter)
      }

      urlParams.set('page', pageNum.toString())
      urlParams.set('pageSize', pageSize.toString())

      return `${pathname}?${urlParams.toString()}`
    },
    [filter, pageSize, pathname],
  )

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / pageSize)

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: UiKey.PaginationControl,
      icon: (
        <div className="flex items-center space-x-2">
          <Pagination
            // Use React state for UI rendering
            current={page}
            // itemRender={(currentPage, type, originalElement) => {
            //   return null
            // }}
            itemRender={(currentPage, type, originalElement) => {
              if (type === 'prev') {
                const canGoPrev = page > 1

                return (
                  <Link
                    href={
                      canGoPrev ? createPageUrl(page - 1) : createPageUrl(page)
                    }
                    prefetch={true}
                  >
                    <Button
                      disabled={!canGoPrev}
                      icon={<LeftOutlined />}
                      size="small"
                    />
                  </Link>
                )
              }

              if (type === 'next') {
                const canGoNext = page < totalPages

                return (
                  <Link
                    href={
                      canGoNext ? createPageUrl(page + 1) : createPageUrl(page)
                    }
                    prefetch={true}
                  >
                    <Button
                      disabled={!canGoNext}
                      icon={<RightOutlined />}
                      size="small"
                    />
                  </Link>
                )
              }

              return originalElement
            }}
            onChange={handlePaginationChange}
            pageSize={pageSize}
            showSizeChanger={true}
            simple
            size="small"
            total={totalItems}
          />
        </div>
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
