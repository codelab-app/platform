import type { IType } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/presenter/container'
import { extractTableQueries } from '@codelab/frontend/shared/utils'
import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { Skeleton, Spin, Table } from 'antd'
import type { ColumnsType, TableRowSelection } from 'antd/lib/table/interface'
import debounce from 'lodash/debounce'
import { arraySet } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { ActionColumn } from './columns'
import { TypeDetailsTable } from './tables/TypeDetailsTable'

export const TypesTable = observer(() => {
  const { fieldService, typeService } = useStore()
  const router = useRouter()
  const { name = '', page = 1, pageSize = 20 } = extractTableQueries(router)

  const handleChange = React.useRef(
    debounce(
      async ({
        newName = typeService.paginationService.filter.name ?? '',
        newPage = typeService.paginationService.page,
        newPageSize = typeService.paginationService.pageSize,
      }: {
        newName?: string
        newPage?: number
        newPageSize?: number
      }) => {
        const goBackToFirstPage =
          newPageSize !== typeService.paginationService.pageSize ||
          newName !== typeService.paginationService.filter.name

        typeService.paginationService.setPage(goBackToFirstPage ? 1 : newPage)
        typeService.paginationService.setPageSize(newPageSize)
        typeService.paginationService.setFilter({ name: newName })
        void typeService.paginationService.getData()

        await router.push(
          {
            pathname: PageType.Type,
            query: {
              name: typeService.paginationService.filter.name,
              page: typeService.paginationService.page,
              pageSize: typeService.paginationService.pageSize,
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
    typeService.paginationService.setPage(page)
    typeService.paginationService.setPageSize(pageSize)
    typeService.paginationService.setFilter({ name })
    void typeService.paginationService.getData()
  }, [])

  const nameColumnSearchProps = useColumnSearchProps<IType>({
    dataIndex: 'name',
    onSearch: (newName) => handleChange({ newName }),
    text: name,
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
        if (typeService.paginationService.isLoading) {
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

  return (
    <Table<IType>
      columns={columns}
      dataSource={typeService.paginationService.data}
      expandable={{
        expandedRowRender: (type) =>
          typeService.paginationService.isLoading ? (
            <Spin />
          ) : (
            <TypeDetailsTable typeId={type.id} />
          ),
      }}
      loading={typeService.paginationService.isLoading}
      pagination={{
        current: typeService.paginationService.page,
        onChange: (newPage, newPageSize) =>
          handleChange({ newPage, newPageSize }),
        pageSize: typeService.paginationService.pageSize,
        position: ['bottomCenter'],
        showSizeChanger: true,
        total: typeService.paginationService.totalItems,
      }}
      rowKey={(type) => type.id}
      rowSelection={rowSelection}
      scroll={{ x: 'max-content', y: '80vh' }}
      size="small"
    />
  )
})
