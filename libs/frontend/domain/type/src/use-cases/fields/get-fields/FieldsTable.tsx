import { DeleteFilled, EditFilled } from '@ant-design/icons'
import {
  IFieldRecord,
  IInterfaceType,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { Button, Divider, Space, Table, Tag } from 'antd'
import { ColumnProps } from 'antd/lib/table/Column'
import { Observer, observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { fieldRef, typeRef } from '../../../store'
import { getValidationRuleTagsArray } from './validation'

export interface FieldsTableProps {
  interfaceType?: IInterfaceType
  isLoading: boolean
  hideActions?: boolean
  typeService: ITypeService
}

const headerCellProps = () => ({ style: tw`font-semibold text-gray-900` })

export const FieldsTable = observer<FieldsTableProps>(
  ({ interfaceType, isLoading, typeService, hideActions }) => {
    const columns: Array<ColumnProps<IFieldRecord>> = [
      Table.EXPAND_COLUMN,
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
        title: 'Validation',
        dataIndex: 'ruleName',
        key: 'ruleName',
        onHeaderCell: headerCellProps,
        render: (_, { validationRules }) =>
          validationRules &&
          validationRules.map((rule) => {
            const color = 'geekblue'

            return typeof rule.value === 'boolean' ? (
              rule.value && (
                <Tag color={color} key={rule.key}>
                  <Space>{rule.key}</Space>
                </Tag>
              )
            ) : (
              <Tag color={color} key={rule.key}>
                <Space>
                  {rule.key}
                  <Divider type="vertical" />
                  {rule.value}
                </Space>
              </Tag>
            )
          }),
      },
      {
        title: 'Default',
        dataIndex: 'defaultValues',
        key: 'defaultValues',
        onHeaderCell: headerCellProps,
        render: () => {
          return <div>value</div>
        },
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

                    typeService.fieldService.updateModal.open({
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

                    typeService.fieldService.deleteModal.open({
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

    const dataSource: Array<IFieldRecord> = [
      ...(interfaceType?.fields.values() ?? []),
    ].map((field) => ({
      id: field.id,
      name: field.name || '',
      key: field.key,
      typeKind: field.type.maybeCurrent ? field.type.maybeCurrent.kind : '',
      description: field.description || '',
      validationRules: getValidationRuleTagsArray(field.validationRules),
      dependentTypes: [],
      type: field.type,
    }))

    return (
      <Table
        columns={
          hideActions
            ? columns.filter((column) => column.key !== 'action')
            : columns
        }
        dataSource={dataSource}
        expandable={{
          expandedRowRender: (record) => {
            console.log(record)

            return null
          },
          rowExpandable: (record) => true,
        }}
        loading={isLoading}
        pagination={{ position: ['bottomCenter'], pageSize: 25 }}
        rowKey={(f) => f.key}
        size="small"
      />
    )
  },
)
