import type { IType } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/presenter/container'
import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { useAsync } from '@react-hookz/web'
import { Skeleton } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import type { TableRowSelection } from 'antd/lib/table/interface'
import isEmpty from 'lodash/isEmpty'
import throttle from 'lodash/throttle'
import { arraySet } from 'mobx-keystone'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { ActionColumn } from './columns'

interface UseTypesTableProps {
  page?: number
  pageSize?: number
  searchName?: string
}

export const useTypesTable = ({
  page,
  pageSize,
  searchName,
}: UseTypesTableProps) => {
  const router = useRouter()
  const { fieldService, typeService } = useStore()

  const [{ result, status }, getPaginatedTypes] = useAsync(() => {
    return typeService.pagination.getPaginatedTypes()
  })

  const isLoadingTypes = status === 'loading'

  useEffect(() => {
    if (pageSize) {
      typeService.pagination.setPageSize(pageSize)
    }

    if (page) {
      typeService.pagination.setCurrentPage(page)
    }

    if (searchName && !isEmpty(searchName)) {
      typeService.pagination.setSearch({ name: searchName })
    }

    void throttle(() => getPaginatedTypes.execute(), 500)()
  }, [pageSize, page, searchName])

  const handlePageChange = (newPage: number, newPageSize: number) => {
    void router.push({
      pathname: PageType.Type,
      query: {
        page: newPage,
        pageSize: newPageSize,
        searchName: typeService.pagination.search.name,
      },
    })
  }

  const nameColumnSearchProps = useColumnSearchProps<IType>({
    dataIndex: 'name',
    onSearch: (value) => {
      void router.push({
        pathname: PageType.Type,
        query: {
          page: typeService.pagination.currentPage,
          pageSize: typeService.pagination.pageSize,
          searchName: value,
        },
      })
    },
    text: typeService.pagination.search.name,
  })

  const columns: ColumnsType<IType> = [
    {
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      title: 'Name',
      ...nameColumnSearchProps,
    },
    {
      dataIndex: 'kind',
      key: 'kind',
      onHeaderCell: headerCellProps,
      title: 'Kind',
      // ...useColumnSearchProps({ dataIndex: 'kind' }),
    },
    {
      key: 'action',
      onHeaderCell: headerCellProps,
      render: (record) => {
        if (isLoadingTypes) {
          return <Skeleton paragraph={false} />
        }

        return (
          <ActionColumn
            fieldService={fieldService}
            type={record}
            typeService={typeService}
          />
        )
      },
      title: 'Action',
      width: 100,
    },
  ]

  const rowSelection: TableRowSelection<IType> = {
    onChange: (_: Array<React.Key>, selectedRows: Array<IType>) => {
      typeService.setSelectedIds(arraySet(selectedRows.map(({ id }) => id)))
    },
    type: 'checkbox',
  }

  return {
    columns,
    handlePageChange,
    isLoadingTypes,
    rowSelection,
  }
}
