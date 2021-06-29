import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { __FieldFragment, __TypeFragment } from '@codelab/codegen/graphql'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { Button, Space, Table, TableColumnProps } from 'antd'
import React from 'react'
import tw from 'twin.macro'

export interface FieldsTableProps {
  fields: Array<__FieldFragment>
  typesById: Record<string, __TypeFragment>
}

export const FieldsTable = ({ fields, typesById }: FieldsTableProps) => {
  const { openDeleteModal, openUpdateModal } = useCRUDModalForm(
    EntityType.Field,
  )

  const headerCellProps = () => ({
    style: tw`font-semibold text-gray-900`,
  })

  const getTypeName = (typeId: string, iteration = 0): string => {
    if (iteration > 10) {
      return ''
    }

    const type = typesById[typeId]

    switch (type?.__typename) {
      case 'SimpleType':
        return type.primitiveType
      case 'ArrayType':
        return `${getTypeName(type.typeId, iteration + 1)} Array`
      case 'EnumType':
        return `Enum (${type.allowedValues.map((v) => v.name).join(',')})`
      case 'Interface':
        return `Object (${type.name})`
    }

    return ''
  }

  const columns: Array<TableColumnProps<any>> = [
    {
      title: 'Field',
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
      dataIndex: 'typeId',
      key: 'typeId',
      onHeaderCell: headerCellProps,
      render: (value) => getTypeName(value),
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
            tw="flex justify-center items-center"
            icon={<EditFilled />}
            onClick={() => openUpdateModal(record.id, record)}
          />
          <Button
            size="small"
            type="primary"
            danger
            tw="flex justify-center items-center"
            icon={<DeleteFilled />}
            onClick={() => openDeleteModal([record.id], record)}
          />
        </Space>
      ),
    },
  ]

  return (
    <Table
      pagination={{ position: ['bottomCenter'] }}
      dataSource={fields}
      columns={columns}
      rowKey={(atom) => atom.id}
    />
  )
}
