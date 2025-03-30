'use client'

import type { SupportedPaginationPathname } from '@codelab/frontend/abstract/application'
import type {
  PaginationClientProps,
  TreeViewClientProps,
} from '@codelab/frontend/abstract/types'

import LeftOutlined from '@ant-design/icons/LeftOutlined'
import RightOutlined from '@ant-design/icons/RightOutlined'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import { Pagination } from 'antd'
import Link from 'next/link'
import { useState } from 'react'

import type { ToolbarItem } from '../../abstract'

import { createPageUrl } from './pagination.utils'

export interface ToolbarPaginationProps {
  pathname: SupportedPaginationPathname
  searchParams: TreeViewClientProps & PaginationClientProps
  totalItems: number
}

/**
 * Hook that provides pagination toolbar items without MobX dependencies
 *
 * Will feel slow in development but with production prefetch enabled will be quick. We previously used local state for page and setTimeout to optimize in development, but is not required.
 */
export const usePaginationToolbar = ({
  pathname,
  searchParams: { filter, page, pageSize },
  totalItems,
}: ToolbarPaginationProps) => {
  const [showSearchBar, setShowSearchBar] = useState(false)

  const handleSearchBarToggle = () =>
    setShowSearchBar((showSearch) => !showSearch)

  const totalPages = Math.ceil(totalItems / pageSize)

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: UiKey.PaginationControl,
      icon: (
        <div className="[&_.ant-pagination-simple-pager]:!me-0">
          <Pagination
            current={page}
            itemRender={(targetPage, type, originalElement) => {
              if (type === 'prev') {
                const canGoPrev = page > 1

                return (
                  <Link
                    href={createPageUrl(pathname, targetPage, pageSize, filter)}
                    prefetch={true}
                  >
                    <LeftOutlined
                      className={
                        !canGoPrev
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'cursor-pointer'
                      }
                    />
                  </Link>
                )
              }

              if (type === 'next') {
                const canGoNext = page < totalPages

                return (
                  <Link
                    href={createPageUrl(pathname, targetPage, pageSize, filter)}
                    prefetch={true}
                  >
                    <RightOutlined
                      className={
                        !canGoNext
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'cursor-pointer'
                      }
                    />
                  </Link>
                )
              }

              return originalElement
            }}
            onChange={() => {
              // Added to avoid warning
            }}
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
