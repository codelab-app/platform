'use client'

import type {
  GetDataFn,
  IPaginationService,
  IRouterService,
  SupportedPaginationModel,
  SupportedPaginationModelPage,
} from '@codelab/frontend/abstract/application'
import type { TablePaginationConfig } from 'antd'

import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import { useEffect } from 'react'
import { useDeepCompareEffect } from 'react-use'
import { debounce } from 'remeda'

interface TablePaginationProps<T extends SupportedPaginationModel> {
  paginationService: IPaginationService<T>
  pathname: SupportedPaginationModelPage
  routerService: IRouterService
}

export const useTablePagination = <T extends SupportedPaginationModel>({
  paginationService,
  pathname,
  routerService,
}: TablePaginationProps<T>) => {
  const router = useRouter()

  const onChange = (page: number, pageSize: number) => {
    const url = queryString.stringifyUrl({
      query: {
        page,
        pageSize,
      },
      url: pathname,
    })

    router.push(url)
  }

  const pagination: TablePaginationConfig = {
    current: routerService.page,
    onChange: (newPage: number, newPageSize: number) => {
      debounce(
        () => {
          onChange(newPage, newPageSize)
        },
        { waitMs: 0 },
      ).call()
    },
    pageSize: routerService.pageSize,
    position: ['bottomCenter'],
    showSizeChanger: true,
    total: paginationService.totalItems,
  }

  return {
    data: paginationService.data,
    isLoading: paginationService.isLoading,
    isLoadingBetweenPages: paginationService.isLoadingBetweenPages,
    onSearch: (searchText: string) =>
      routerService.setSearchParams({
        ...routerService.searchParams,
        search: searchText,
      }),
    pagination,
    searchText: routerService.search,
  }
}
