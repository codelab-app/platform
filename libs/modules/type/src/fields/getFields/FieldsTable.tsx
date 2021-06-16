import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { __FieldCollectionFragment } from '@codelab/graphql'
import { Button, Space, Table, TableColumnProps } from 'antd'
import React from 'react'
import tw from 'twin.macro'

export interface FieldsTableProps {
  fields: __FieldCollectionFragment
}

export const FieldsTable = ({ fields }: FieldsTableProps) => {
  const { openDeleteModal, openUpdateModal } = useCRUDModalForm(
    EntityType.Field,
  )

  const headerCellProps = () => ({
    style: tw`font-semibold text-gray-900`,
  })

  const columns: Array<TableColumnProps<any>> = [
    {
      title: 'Field',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <Button
            size="small"
            type="primary"
            danger
            tw="flex justify-center items-center"
            icon={<DeleteFilled />}
            onClick={() => openDeleteModal([record.id], record)}
          />
          <Button
            size="small"
            type="primary"
            danger
            tw="flex justify-center items-center"
            icon={<EditFilled />}
            onClick={() => openUpdateModal(record.id, record)}
          />
        </Space>
      ),
    },
  ]

  return (
    <Table
      pagination={{ position: ['bottomCenter'] }}
      dataSource={fields.fields}
      columns={columns}
      rowKey={(atom) => atom.id}
    />
  )
}
