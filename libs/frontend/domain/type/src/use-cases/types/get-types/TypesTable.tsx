import type { IType, ITypeRecord } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/presentation/container'
import {
  headerCellProps,
  useColumnSearchProps,
} from '@codelab/frontend/presentation/view'
import { useTablePagination } from '@codelab/frontend/shared/utils'
import { Skeleton, Spin, Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table/interface'
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

  const nameColumnSearchProps = useColumnSearchProps<ITypeRecord>({
    dataIndex: 'name',
    onSearch: (name) =>
      handleChange({ newFilter: { name: name || undefined } }),
    text: filter.name,
  })

  const columns: ColumnsType<ITypeRecord> = [
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

  const dataSource: Array<ITypeRecord> = data.map(({ id, kind, name }) => ({
    id,
    kind,
    name,
  }))

  return (
    <Table<ITypeRecord>
      columns={columns}
      dataSource={dataSource}
      expandable={{
        expandedRowRender: (type) =>
          isLoading ? <Spin /> : <TypeDetailsTable typeId={type.id} />,
      }}
      loading={isLoading}
      pagination={pagination}
      rowKey={(type) => type.id}
      scroll={{ x: 'max-content', y: '80vh' }}
      size="small"
    />
  )
})
