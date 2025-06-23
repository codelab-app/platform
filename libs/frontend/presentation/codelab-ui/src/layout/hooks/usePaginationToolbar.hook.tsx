'use client'

import type { SupportedPaginationPathname } from '@codelab/frontend-abstract-application'
import type { SearchParamsClientProps } from '@codelab/frontend-abstract-types'

import SearchOutlined from '@ant-design/icons/SearchOutlined'
import { UiKey } from '@codelab/frontend-abstract-types'
import { Pagination } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { debounce } from 'remeda'

import type { ToolbarItem } from '../../abstract'

import { createPageUrl } from './pagination.utils'

export interface ToolbarPaginationProps {
  pathname: SupportedPaginationPathname
  searchParams: SearchParamsClientProps
  totalItems: number
}

/**
 * Hook that provides pagination toolbar items without MobX dependencies
 *
 * Will feel slow in development but with production prefetch enabled will be quick. We previously used local state for page and setTimeout to optimize in development, but is not required.
 */
export const usePaginationToolbar = ({
  pathname,
  searchParams: { filter, page, pageSize, search },
  totalItems,
}: ToolbarPaginationProps) => {
  const [showSearchBar, setShowSearchBar] = useState(Boolean(search))
  const router = useRouter()

  useEffect(() => {
    if (page < Math.ceil(totalItems / pageSize)) {
      router.prefetch(
        createPageUrl(pathname, page + 1, pageSize, filter, search),
      )
    }

    if (page > 1) {
      router.prefetch(
        createPageUrl(pathname, page - 1, pageSize, filter, search),
      )
    }
  }, [router, pathname, page, pageSize, filter, search, totalItems])

  const { call: handlePaginationChange } = useRef(
    debounce(
      (newPage: number, newPageSize: number, newSearch = search) => {
        router.push(
          createPageUrl(pathname, newPage, newPageSize, filter, newSearch),
        )
      },
      { waitMs: 500 },
    ),
  ).current

  const handleSearchBarToggle = () =>
    setShowSearchBar((showSearch) => !showSearch || Boolean(search))

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: UiKey.PaginationControl,
      icon: (
        <div className="[&_.ant-pagination-simple-pager]:!me-0">
          <Pagination
            current={page}
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

  return { handlePaginationChange, showSearchBar, toolbarItems }
}
