'use client'

import type {
  GetDataFn,
  IPaginationService,
  IRouterService,
  SupportedPaginationModel,
  SupportedPaginationModelPage,
} from '@codelab/frontend/abstract/application'
import type { TablePaginationConfig } from 'antd'

import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { withAsyncSpanFunc } from '@codelab/shared-infra-sentry'
import * as Sentry from '@sentry/react'
import { addBreadcrumb } from '@sentry/react'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import { useEffect } from 'react'
import { useCustomCompareEffect, useDeepCompareEffect } from 'react-use'
import { debounce } from 'remeda'

import { paginationContext } from './pagination.service'

interface TablePaginationProps<T extends SupportedPaginationModel> {
  getDataFn: GetDataFn<T>
  paginationService: IPaginationService<T>
  pathname: SupportedPaginationModelPage
  routerService: IRouterService
}

export const useTablePagination = <T extends SupportedPaginationModel>({
  getDataFn,
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

  useEffect(() => {
    paginationContext.setDefault({
      getDataFn,
    })
  }, [getDataFn])

  // useEffect(() => {
  //   console.log('Get data!', {
  //     filter: routerService.filter,
  //     page: routerService.page,
  //     pageSize: routerService.pageSize,
  //     search: routerService.search,
  //   })

  //   void paginationService.getData()
  // }, [
  //   routerService.page,
  //   routerService.pageSize,
  //   routerService.search,
  //   routerService.filter,
  // ])

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
    getData: paginationService.getData,
    isLoading: paginationService.isLoading,
    onSearch: (searchText: string) =>
      routerService.setQueryParams({
        ...routerService.queryParams,
        search: searchText,
      }),
    pagination,
    searchText: routerService.search,
  }
}
