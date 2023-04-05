import type { IType } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/presenter/container'
import { useTablePagination } from '@codelab/frontend/shared/utils'
import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { Skeleton, Spin, Table } from 'antd'
import type { ColumnsType, TableRowSelection } from 'antd/lib/table/interface'
import { arraySet } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ActionColumn } from './columns'
import { TypeDetailsTable } from './tables/TypeDetailsTable'

export const TypesTable = observer(() => {
  const { fieldService, typeService } = useStore()

  const { data, filter, handleChange, isLoading, pagination } =
    useTablePagination<IType, { name: string }>({
      filterTypes: { name: 'string' },
      pathname: PageType.Type,
      service: typeService,
    })

  const nameColumnSearchProps = useColumnSearchProps<IType>({
    dataIndex: 'name',
    onSearch: (name) =>
      handleChange({ newFilter: { name: name || undefined } }),
    text: filter.name,
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
        if (isLoading) {
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
      dataSource={data}
      expandable={{
        expandedRowRender: (type) =>
          isLoading ? <Spin /> : <TypeDetailsTable typeId={type.id} />,
      }}
      loading={isLoading}
      pagination={pagination}
      rowKey={(type) => type.id}
      rowSelection={rowSelection}
      scroll={{ x: 'max-content', y: '80vh' }}
      size="small"
    />
  )
})
