import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { ITypeService } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { Button, Space, Table, TableColumnProps } from 'antd'
import { Observer, observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { fieldRef, InterfaceType, typeRef } from '../../../store'

export type FieldsTableProps = {
  interfaceType?: InterfaceType
  isLoading: boolean
  hideActions?: boolean
} & { typeService: ITypeService }

interface CellData {
  id: string
  name: Nullish<string>
  description: Nullish<string>
  key: string
  typeKind?: string
}

const headerCellProps = () => ({ style: tw`font-semibold text-gray-900` })

export const FieldsTable = observer<FieldsTableProps>(
  ({ interfaceType, isLoading, typeService, hideActions }) => {
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

                    typeService.fieldUpdateModal.open({
                      field: fieldRef(record.id),
                      interface: typeRef(interfaceType),
                    })
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

                    typeService.fieldDeleteModal.open({
                      field: fieldRef(record.id),
                      interface: typeRef(interfaceType),
                    })
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

    const dataSource: Array<CellData> = [
      ...(interfaceType?.fields.values() ?? []),
    ].map((f) => ({
      id: f.id,
      name: f.name || '',
      key: f.key,
      typeKind: f.type.maybeCurrent ? f.type.maybeCurrent.kind : '',
      description: f.description || '',
    }))

    return (
      <Table
        columns={
          hideActions ? columns.filter((x) => x.key !== 'action') : columns
        }
        dataSource={dataSource}
        loading={isLoading}
        pagination={{ position: ['bottomCenter'], pageSize: 25 }}
        rowKey={(f) => f.key}
        size="small"
      />
    )
  },
)
