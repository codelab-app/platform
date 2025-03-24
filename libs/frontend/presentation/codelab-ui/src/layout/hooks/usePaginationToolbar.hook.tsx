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
import { useEffect, useState } from 'react'

import type { ToolbarItem } from '../../abstract'

import { createPageUrl } from './pagination.utils'

export interface ToolbarPaginationProps {
  pathname: SupportedPaginationPathname
  searchParams: IPaginationSearchParams
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
        <div className="flex items-center space-x-2">
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
                    href={createPageUrl(pathname, targetPage, pageSize, filter)}
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
