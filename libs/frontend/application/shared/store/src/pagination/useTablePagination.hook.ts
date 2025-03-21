'use client'

import type { SupportedPaginationModel } from '@codelab/frontend/abstract/application'
import type { TablePaginationConfig } from 'antd'

import { debounce } from 'remeda'

interface TablePaginationProps<T> {
  data: Array<T>
  isLoading: boolean
  isLoadingBetweenPages: boolean
  page: number
  pageSize: number
  search?: string
  totalItems: number
  onPageChange(page: number, pageSize: number): void
  onSearch?(searchText: string): void
}

export const useTablePagination = <T extends SupportedPaginationModel>({
  data,
  onPageChange,
  onSearch,
  page,
  pageSize,
  search,
  totalItems,
}: TablePaginationProps<T>) => {
  const pagination: TablePaginationConfig = {
    current: page,
    onChange: (newPage: number, newPageSize: number) => {
      debounce(
        () => {
          onPageChange(newPage, newPageSize)
        },
        { waitMs: 0 },
      ).call()
    },
    pageSize,
    position: ['bottomCenter'],
    showSizeChanger: true,
    total: totalItems,
  }

  return {
    data,
    onSearch,
    pagination,
    searchText: search,
  }
}
