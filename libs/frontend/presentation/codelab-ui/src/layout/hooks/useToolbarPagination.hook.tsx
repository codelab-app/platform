'use client'

import type {
  IPaginationService,
  IRouterService,
  SupportedPaginationModel,
} from '@codelab/frontend/abstract/application'

import SearchOutlined from '@ant-design/icons/SearchOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import { useUpdateSearchParams } from '@codelab/frontend/shared/utils'
import { Pagination } from 'antd'
import { useCallback, useState } from 'react'

import type { ToolbarItem } from '../../abstract'

/**
 *
 * @param paginationService Must NOT destructure, or else lose reactivity
 * @returns
 */
export const useToolbarPagination = <T extends SupportedPaginationModel>(
  paginationService: IPaginationService<T>,
  routerService: IRouterService,
) => {
  const [showSearchBar, setShowSearchBar] = useState(false)
  const { updateParams } = useUpdateSearchParams()

  const handlePaginationChange = useCallback(
    (page: number, pageSize: number) => {
      updateParams((params) => params.set('page', page.toString()))
      updateParams((params) => params.set('pageSize', pageSize.toString()))

      routerService.setQueryParams({
        ...routerService.queryParams,
        page,
        pageSize,
      })
    },
    [routerService, updateParams],
  )

  const handleSearchBarToggle = useCallback(() => {
    setShowSearchBar((showSearch) => !showSearch)
  }, [])

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: UiKey.PagintaionControl,
      icon: (
        <Pagination
          defaultCurrent={routerService.page}
          defaultPageSize={routerService.pageSize}
          onChange={handlePaginationChange}
          showSizeChanger={true}
          simple
          size="small"
          total={paginationService.totalItems}
        />
      ),
    },
    {
      cuiKey: UiKey.PaginationToobarItemSearch,
      icon: <SearchOutlined />,
      onClick: handleSearchBarToggle,
      title: 'Search',
    },
  ]

  return { showSearchBar, toolbarItems }
}
