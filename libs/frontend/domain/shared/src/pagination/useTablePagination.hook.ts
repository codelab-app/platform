import type {
  Filterables,
  IPaginationService,
  SupportedPaginationModel,
  SupportedPaginationModelPage,
} from '@codelab/frontend/abstract/core'
import type { TablePaginationConfig } from 'antd'
import debounce from 'lodash/debounce'
import isMatch from 'lodash/isMatch'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { extractTableQueries } from './extract-table-queries'

interface Props<T> {
  filterTypes?: Record<keyof T, 'boolean' | 'number' | 'string' | 'string[]'>
  paginationService: IPaginationService<SupportedPaginationModel, Filterables>
  pathname: SupportedPaginationModelPage
}

export const useTablePagination = <
  T extends SupportedPaginationModel,
  U extends Filterables,
>({
  filterTypes,
  paginationService,
  pathname,
}: Props<U>) => {
  const router = useRouter()

  const {
    filter,
    page = 1,
    pageSize = 20,
  } = extractTableQueries<U>(router, filterTypes)

  const handleChange = React.useRef(
    debounce(
      async ({
        newFilter = paginationService.filter,
        newPage = paginationService.currentPage,
        newPageSize = paginationService.pageSize,
      }: {
        newFilter?: Filterables
        newPage?: number
        newPageSize?: number
      }) => {
        const goBackToFirstPage =
          newPageSize !== paginationService.pageSize ||
          !isMatch(newFilter, paginationService.filter)

        paginationService.setCurrentPage(goBackToFirstPage ? 1 : newPage)
        paginationService.setPageSize(newPageSize)
        paginationService.setFilter(newFilter)
        void paginationService.getData()

        await router.push(
          {
            pathname,
            query: {
              ...paginationService.filter,
              page: paginationService.currentPage,
              pageSize: paginationService.pageSize,
            },
          },
          undefined,
          { shallow: true },
        )
      },
      500,
    ),
  ).current

  useEffect(() => {
    paginationService.setCurrentPage(page)
    paginationService.setPageSize(pageSize)
    paginationService.setFilter(filter)
    void paginationService.getData()
  }, [])

  const pagination: TablePaginationConfig = {
    current: paginationService.currentPage,
    onChange: (newPage, newPageSize) => handleChange({ newPage, newPageSize }),
    pageSize: paginationService.pageSize,
    position: ['bottomCenter'],
    showSizeChanger: true,
    total: paginationService.totalItems,
  }

  return {
    data: paginationService.data as Array<T>,
    filter,
    handleChange,
    isLoading: paginationService.isLoading,
    page,
    pageSize,
    pagination,
  }
}
