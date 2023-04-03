import type { IType } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/presenter/container'
import { extractTableQueries } from '@codelab/frontend/shared/utils'
import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { useAsync } from '@react-hookz/web'
import { Skeleton } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import type { TableRowSelection } from 'antd/lib/table/interface'
import { arraySet } from 'mobx-keystone'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { ActionColumn } from './columns'

export const useTypesTable = () => {
  const router = useRouter()
  const { page, pageSize, searchName } = extractTableQueries(router)
  const { fieldService, typeService } = useStore()

  const [{ result: currentData, status }, getPaginatedTypes] = useAsync(() => {
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

    typeService.pagination.setSearch({ name: searchName })

    void getPaginatedTypes.execute()
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
          page,
          pageSize,
          searchName: value,
        },
      })
    },
    text: searchName,
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
    currentData,
    handlePageChange,
    isLoadingTypes,
    rowSelection,
  }
}
