import type {
  Filterables,
  SupportedPaginationModel,
  SupportedPaginationModelPage,
  SupportedPaginationModelService,
} from '@codelab/frontend/abstract/core'
import type { TablePaginationConfig } from 'antd'
import debounce from 'lodash/debounce'
import isMatch from 'lodash/isMatch'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { extractTableQueries } from './extractTableQueries'

interface Props<T> {
  filterTypes?: Record<keyof T, 'boolean' | 'number' | 'string' | 'string[]'>
  pathname: SupportedPaginationModelPage
  service: SupportedPaginationModelService
}

export const useTablePagination = <
  T extends SupportedPaginationModel,
  U extends Filterables,
>({
  filterTypes,
  pathname,
  service,
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
        newFilter = service.paginationService.filter,
        newPage = service.paginationService.page,
        newPageSize = service.paginationService.pageSize,
      }: {
        newFilter?: Filterables
        newPage?: number
        newPageSize?: number
      }) => {
        console.log('newFilter', newFilter.name)
        console.log(
          'service.paginationService.filter',
          service.paginationService.filter.name,
        )

        const goBackToFirstPage =
          newPageSize !== service.paginationService.pageSize ||
          !isMatch(newFilter, service.paginationService.filter)

        service.paginationService.setPage(goBackToFirstPage ? 1 : newPage)
        service.paginationService.setPageSize(newPageSize)
        service.paginationService.setFilter(newFilter)
        void service.paginationService.getData()

        await router.push(
          {
            pathname,
            query: {
              ...service.paginationService.filter,
              page: service.paginationService.page,
              pageSize: service.paginationService.pageSize,
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
    service.paginationService.setPage(page)
    service.paginationService.setPageSize(pageSize)
    service.paginationService.setFilter(filter)
    void service.paginationService.getData()
  }, [])

  const pagination: TablePaginationConfig = {
    current: service.paginationService.page,
    onChange: (newPage, newPageSize) => handleChange({ newPage, newPageSize }),
    pageSize: service.paginationService.pageSize,
    position: ['bottomCenter'],
    showSizeChanger: true,
    total: service.paginationService.totalItems,
  }

  return {
    data: service.paginationService.data as Array<T>,
    filter,
    handleChange,
    isLoading: service.paginationService.isLoading,
    page,
    pageSize,
    pagination,
  }
}
