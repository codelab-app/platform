import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { Button, Space, Table, TableColumnProps } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import {
  InterfaceTypeFieldEdgeFragment,
  InterfaceTypeWithFieldsFragment,
} from '../../../graphql'
import { useFieldDispatch } from '../../../hooks'
import { getTypeName } from '../../../shared/getTypeName'

export interface FieldsTableProps {
  interfaceType?: InterfaceTypeWithFieldsFragment
  isLoading: boolean
}

export const FieldsTable = ({ interfaceType, isLoading }: FieldsTableProps) => {
  const { openDeleteModal, openUpdateModal } = useFieldDispatch()

  const headerCellProps = () => ({
    style: tw`font-semibold text-gray-900`,
  })

  const columns: Array<TableColumnProps<InterfaceTypeFieldEdgeFragment>> = [
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
      title: 'Kind',
      dataIndex: 'key',
      key: 'key',
      onHeaderCell: headerCellProps,
      render: (_, { node }) => getTypeName(node),
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
                updateId: record.node.id,
                entity: { ...record, existingTypeId: record.node.id },
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
                // this won't delete the actual type, we just specify the id of the target type
                // so that we know which edge (aka field) to detach.
                deleteIds: [record.node.id],
                entity: { ...record, existingTypeId: record.node.id },
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
      dataSource={interfaceType?.fieldsConnection.edges}
      loading={isLoading}
      pagination={{ position: ['bottomCenter'], pageSize: 25 }}
      rowKey={(f) => f.key}
      size="small"
    />
  )
}
