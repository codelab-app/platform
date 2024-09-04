'use client'

import LeftOutlined from '@ant-design/icons/LeftOutlined'
import RightOutlined from '@ant-design/icons/RightOutlined'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import {
  type Filterables,
  type IPaginateable,
  type IPaginationService,
  routerServiceContext,
  type SupportedPaginationModel,
  type SupportedPaginationModelPage,
} from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import { useTablePagination } from '@codelab/frontend-application-shared-store/pagination'
import { useObserver } from 'mobx-react-lite'
import { usePathname, useRouter } from 'next/navigation'
import queryString from 'query-string'
import React, { useCallback, useState } from 'react'
import type { ToolbarItem } from '../../abstract'
import { CuiInput } from '../../components'

/**
 *
 * @param paginationService Must NOT destructure, or else lose reactivity
 * @returns
 */
export const useToolbarPagination = <
  T extends SupportedPaginationModel,
  U extends Filterables,
>(
  paginationService: IPaginationService<T, U>,
) => {
  const router = useRouter()
  const pathname = usePathname()
  const [showSearchBar, setShowSearchBar] = useState(false)

  const goToNextPage = () => {
    const url = queryString.stringifyUrl({
      query: {
        page: paginationService.currentPage + 1,
      },
      url: pathname,
    })

    router.push(url)
  }

  const goToPreviousPage = () => {
    const url = queryString.stringifyUrl({
      query: {
        page: Math.max(paginationService.currentPage - 1, 1),
      },
      url: pathname,
    })

    router.push(url)
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
                console.log(value)
                paginationService.setCurrentPage(value)
              }
            }}
            selectAllOnClick
            type="number"
            value={paginationService.currentPage}
          />
          <span className="m-0 w-2 p-0 text-center text-sm">/</span>
          <span className="m-0 w-6 p-0 text-center text-sm">{`${paginationService.totalPages}`}</span>
        </div>
      ),
      title: `Current page: ${paginationService.currentPage} / ${paginationService.totalPages}`,
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
        <div className="flex w-20 flex-row items-center justify-between">
          <CuiInput
            onChange={(value) => {
              if (typeof value === 'number' && value > 0) {
                paginationService.setPageSize(value)
              }
            }}
            selectAllOnClick
            type="number"
            value={paginationService.pageSize}
          />
          <span className="m-0 w-2 p-1 text-sm">/</span>
          <span className="m-0 p-0 text-sm">Page</span>
        </div>
      ),
      title: `${paginationService.pageSize} items per page`,
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
