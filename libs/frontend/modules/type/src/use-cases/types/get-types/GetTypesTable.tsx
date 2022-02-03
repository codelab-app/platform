import { RightCircleOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  ListItemDeleteButton,
  ListItemEditButton,
  useColumnSearchProps,
} from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { Space, Table } from 'antd'
import { ColumnsType, TableRowSelection } from 'antd/lib/table/interface'
import Link from 'next/link'
import React from 'react'
import { TypeBaseFragment } from '../../../graphql'
import { useTypeDispatch } from '../../../hooks'
import { useGetAllTypesQuery } from '../../../hooks/useGetAllTypes'

export const GetTypesTable = () => {
  const { data, isLoading } = useGetAllTypesQuery()
  const { openDeleteModal, openUpdateModal, setSelectedIds } = useTypeDispatch()

  const columns: ColumnsType<TypeBaseFragment> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('name'),
    },
    {
      title: 'Kind',
      dataIndex: 'typeKind',
      key: 'typeKind',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('typeKind'),
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          {(record as any).typeKind === 'InterfaceType' ? (
            <Link
              href={PageType.InterfaceDetail.replace(
                '[interfaceId]',
                record.id,
              )}
            >
              <RightCircleOutlined />
            </Link>
          ) : (
            <ListItemEditButton
              onClick={() =>
                openUpdateModal({
                  updateId: record.id,
                  entity: record,
                })
              }
            />
          )}

          <ListItemDeleteButton
            onClick={() =>
              openDeleteModal({ deleteIds: [record.id], entity: record })
            }
          />
        </Space>
      ),
    },
  ]

  const rowSelection: TableRowSelection<TypeBaseFragment> = {
    type: 'checkbox',
    onChange: (_: Array<React.Key>, selectedRows: Array<TypeBaseFragment>) => {
      setSelectedIds({ selectedIds: selectedRows.map(({ id }) => id) })
    },
  }

  return (
    <Table<TypeBaseFragment>
      columns={columns}
      dataSource={data?.types ?? []}
      loading={isLoading}
      pagination={{ position: ['bottomCenter'] }}
      rowKey={(type) => type.id}
      rowSelection={rowSelection}
      size="small"
    />
  )
}
