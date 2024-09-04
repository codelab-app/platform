'use client'

import type {
  Filterables,
  IPaginationService,
  SupportedPaginationModel,
  SupportedPaginationModelPage,
} from '@codelab/frontend/abstract/application'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { TablePaginationConfig } from 'antd'
import debounce from 'lodash/debounce'
import isMatch from 'lodash/isMatch'
import {
  type ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import queryString from 'query-string'
import React, { useCallback, useEffect, useMemo } from 'react'

interface TablePaginationProps<
  T extends SupportedPaginationModel,
  U extends Filterables,
> {
  filterables: U
  paginationService: IPaginationService<T, U>
  pathname: SupportedPaginationModelPage
}

export const useTablePagination = <
  T extends SupportedPaginationModel,
  U extends Filterables,
>({
  filterables,
  paginationService,
  pathname,
}: TablePaginationProps<T, U>) => {
  const router = useRouter()

  const generateUrlSearchParams = ({
    filter,
    page,
    pageSize,
    searchQuery,
  }: {
    filter?: Array<string>
    page: number
    pageSize: number
    searchQuery?: string
  }) => {
    const params: Record<string, string> = {
      page: page.toString(),
      pageSize: pageSize.toString(),
    }

    if (searchQuery !== undefined) {
      params.searchQuery = searchQuery
    }

    if (filter !== undefined && filter.length > 0) {
      params.filter = filter.join(',')
    }

    return new URLSearchParams(params)
  }

  const onChange = (page: number, pageSize: number) => {
    const queryParams = generateUrlSearchParams({ page, pageSize })

    router.push(`${pathname}?${queryParams.toString()}`)
  }

  useEffect(() => {
    void paginationService.getData()
  }, [paginationService])

  const pagination: TablePaginationConfig = {
    current: paginationService.currentPage,
    onChange: debounce((newPage, newPageSize) => {
      return
      // return onChange({
      //   newPage,
      //   newPageSize,
      // }),
    }, 500),
    pageSize: paginationService.pageSize,
    position: ['bottomCenter'],
    showSizeChanger: true,
    total: paginationService.totalItems,
  }

  return {
    data: paginationService.data,
    isLoading: paginationService.isLoading,
    onSearch: (searchText: string) =>
      paginationService.setSearchQuery(searchText),
    pagination,
    searchText: paginationService.searchQuery,
  }
}
