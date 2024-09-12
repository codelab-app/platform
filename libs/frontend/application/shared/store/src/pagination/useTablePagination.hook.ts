'use client'

import type {
  GetDataFn,
  IPaginationService,
  SupportedPaginationModel,
  SupportedPaginationModelPage,
} from '@codelab/frontend/abstract/application'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import type { TablePaginationConfig } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { debounce } from 'remeda'
import { paginationContext } from './pagination.service'

interface TablePaginationProps<T extends SupportedPaginationModel> {
  getDataFn: GetDataFn<T>
  paginationService: IPaginationService<T>
  pathname: SupportedPaginationModelPage
}

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

export const useTablePagination = <T extends SupportedPaginationModel>({
  getDataFn,
  paginationService,
  pathname,
}: TablePaginationProps<T>) => {
  const { routerService } = useApplicationStore()
  const router = useRouter()

  const onChange = (page: number, pageSize: number) => {
    const queryParams = generateUrlSearchParams({ page, pageSize })

    router.push(`${pathname}?${queryParams.toString()}`)
  }

  useEffect(() => {
    paginationContext.setDefault({
      getDataFn,
    })
    void paginationService.getData()
  }, [])

  const pagination: TablePaginationConfig = {
    current: routerService.page,
    onChange: (newPage: number, newPageSize: number) => {
      debounce(
        () => {
          onChange(newPage, newPageSize)
        },
        { waitMs: 500 },
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
    onSearch: (searchText: string) =>
      routerService.setQueryParams({
        search: searchText,
      }),
    pagination,
    searchText: routerService.search,
  }
}
