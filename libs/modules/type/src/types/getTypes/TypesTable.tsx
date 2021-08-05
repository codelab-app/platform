import { RightCircleOutlined } from '@ant-design/icons'
import { __TypeFragment } from '@codelab/codegen/graphql'
import {
  ListItemDeleteButton,
  ListItemEditButton,
  PageType,
} from '@codelab/frontend/shared'
import { Space, Table, TableProps } from 'antd'
import { ColumnsType } from 'antd/lib/table/interface'
import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'

export interface TypesTablesProps {
  types: Array<__TypeFragment>
  onDeleteClick: (type: __TypeFragment) => any
  onEditClick: (type: __TypeFragment) => any
  tableProps?: Omit<TableProps<__TypeFragment>, 'dataSource' | 'rowKey'>
}

const headerCellProps = () => ({
  style: tw`font-semibold text-gray-900`,
})

export const TypesTable = ({
  types,
  onDeleteClick,
  tableProps,
  onEditClick,
}: TypesTablesProps) => {
  const columns: ColumnsType<__TypeFragment> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
    },
    {
      title: 'Kind',
      dataIndex: '__typename',
      key: 'typename',
      onHeaderCell: headerCellProps,
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          {record.__typename === 'InterfaceType' ? (
            <Link
              href={PageType.InterfaceDetail.replace(
                '[interfaceId]',
                record.id,
              )}
            >
              <RightCircleOutlined />
            </Link>
          ) : (
            <ListItemEditButton onClick={() => onEditClick(record)} />
          )}

          <ListItemDeleteButton onClick={() => onDeleteClick(record)} />
        </Space>
      ),
    },
  ]

  if (tableProps?.columns) {
    columns.push(tableProps.columns as any)
  }

  return (
    <Table<__TypeFragment>
      pagination={tableProps?.pagination || { position: ['bottomCenter'] }}
      dataSource={types}
      columns={columns}
      rowKey={(type) => type.id}
    />
  )
}

TypesTable.displayName = 'TypesTables'
