import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { Nullish } from '@codelab/shared/abstract/types'
import { Button, Space, Table, TableColumnProps } from 'antd'
import { Observer, observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { getTypeName } from '../../../shared/getTypeName'
import {
  FieldModalStoreMetadata,
  fieldRef,
  InterfaceType,
  typeRef,
  TypeService,
  WithTypeService,
} from '../../../store'

export type FieldsTableProps = {
  interfaceType?: InterfaceType
  isLoading: boolean
} & WithTypeService

interface CellData {
  id: string
  name: Nullish<string>
  description: Nullish<string>
  key: string
  typeKind?: string
}

const headerCellProps = () => ({ style: tw`font-semibold text-gray-900` })

export const FieldsTable = observer<FieldsTableProps>(
  ({ interfaceType, isLoading, typeService }) => {
    const columns: Array<TableColumnProps<CellData>> = [
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
        dataIndex: 'typeKind',
        key: 'typeKind',
        onHeaderCell: headerCellProps,
      },
      {
        title: 'Action',
        key: 'action',
        onHeaderCell: headerCellProps,
        width: 100,
        render: (text, record) => (
          <Observer>
            {() => (
              <Space size="middle">
                <Button
                  icon={<EditFilled />}
                  onClick={() => {
                    if (!interfaceType) {
                      return
                    }

                    typeService.fieldUpdateModal.open(
                      new FieldModalStoreMetadata({
                        field: fieldRef(record.id),
                        interface: typeRef(interfaceType),
                      }),
                    )
                  }}
                  size="small"
                  type="primary"
                />
                <Button
                  danger
                  icon={<DeleteFilled />}
                  onClick={() => {
                    if (!interfaceType) {
                      return
                    }

                    typeService.fieldDeleteModal.open(
                      new FieldModalStoreMetadata({
                        field: fieldRef(record.id),
                        interface: typeRef(interfaceType),
                      }),
                    )
                  }}
                  size="small"
                  type="primary"
                />
              </Space>
            )}
          </Observer>
        ),
      },
    ]

    const dataSource: Array<CellData> =
      interfaceType?.fieldsArray?.map((f) => ({
        id: f.id,
        name: f.name || '',
        key: f.key,
        typeKind: f.type.current ? getTypeName(f.type.current) : '',
        description: f.description || '',
      })) ?? []

    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        pagination={{ position: ['bottomCenter'], pageSize: 25 }}
        rowKey={(f) => f.key}
        size="small"
      />
    )
  },
)
