import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { TypeTree } from '@codelab/shared/core'
import { Button, Space, Table, TableColumnProps } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { useFieldDispatch } from '../../../hooks'
import { getTypeName } from '../../../shared/getTypeName'

export interface FieldsTableProps {
  tree: TypeTree
}

export const FieldsTable = ({ tree }: FieldsTableProps) => {
  const { openDeleteModal, openUpdateModal } = useFieldDispatch()

  const headerCellProps = () => ({
    style: tw`font-semibold text-gray-900`,
  })

  const columns: Array<TableColumnProps<any>> = [
    {
      title: 'Field Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
    },
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      onHeaderCell: headerCellProps,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      onHeaderCell: headerCellProps,
    },
    {
      title: 'Type',
      dataIndex: 'id',
      key: 'id',
      onHeaderCell: headerCellProps,
      render: (id) => getTypeName(tree.getFieldType(id), tree),
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditFilled />}
            onClick={() =>
              openUpdateModal({
                updateId: record.id,
                entity: {
                  ...record,
                  typeId: tree.getFieldType(record.id)?.id,
                },
              })
            }
            size="small"
            type="primary"
          />
          <Button
            danger
            icon={<DeleteFilled />}
            onClick={() =>
              openDeleteModal({
                deleteIds: [record.id],
                entity: {
                  ...record,
                  typeId: tree.getFieldType(record.id)?.id,
                },
              })
            }
            size="small"
            type="primary"
          />
        </Space>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={tree.getRootFields()}
      pagination={{ position: ['bottomCenter'], pageSize: 25 }}
      rowKey={(atom) => atom.id}
      size="small"
    />
  )
}
