import {
  IAnyType,
  IFieldRecord,
  IFieldService,
  IInterfaceType,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { Divider, Space, Table, Tag } from 'antd'
import { ColumnProps } from 'antd/lib/table/Column'
import { Observer, observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { fieldRef, typeRef } from '../../../store'
import { NestedTypeTable } from '../../types/get-types'
import { CreateFieldButton } from '../create-field'
import { getValidationRuleTagsArray } from './validation'

export interface FieldsTableProps {
  interfaceType: IInterfaceType
  isLoading: boolean
  hideActions?: boolean
  fieldService: IFieldService
  typeService: ITypeService
}

const headerCellProps = () => ({ style: tw`font-semibold text-gray-900` })

export const FieldsTable = observer<FieldsTableProps>(
  ({ interfaceType, fieldService, isLoading, hideActions, typeService }) => {
    const columns: Array<ColumnProps<IFieldRecord>> = [
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
      Table.EXPAND_COLUMN,
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        onHeaderCell: headerCellProps,
        render: (type: IAnyType) => (
          <Space>
            {type.name}
            <ListItemEditButton
              onClick={() => typeService.updateModal.open(typeRef(type.id))}
            />
          </Space>
        ),
      },
      {
        title: 'Kind',
        dataIndex: 'type',
        key: 'type',
        onHeaderCell: headerCellProps,
        render: (type: IAnyType) => <Space>{type.kind}</Space>,
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
                {record.type?.kind === ITypeKind.InterfaceType ? (
                  <CreateFieldButton
                    fieldService={fieldService}
                    interfaceId={record.type.id}
                  />
                ) : null}
                <ListItemEditButton
                  onClick={() => {
                    fieldService.updateModal.open({
                      field: fieldRef(record.id),
                      interface: typeRef(interfaceType),
                    })
                  }}
                />
                <ListItemDeleteButton
                  onClick={() => {
                    fieldService.deleteModal.open({
                      field: fieldRef(record.id),
                      interface: typeRef(interfaceType),
                    })
                  }}
                />
              </Space>
            )}
          </Observer>
        ),
      },
    ]

    const dataSource: Array<IFieldRecord> = interfaceType.fields.map(
      (field) => {
        return {
          id: field.id,
          name: field.name || '',
          key: field.key,
          type: {
            id: field.type.maybeCurrent?.id ?? '',
            name: field.type.maybeCurrent?.name ?? '',
            kind: field.type.maybeCurrent?.kind ?? '',
          },
          description: field.description || '',
          validationRules: getValidationRuleTagsArray(field.validationRules),
          dependentTypes: [],
        }
      },
    )

    return (
      <Table
        columns={
          hideActions
            ? columns.filter((column) => column.key !== 'action')
            : columns
        }
        dataSource={dataSource}
        expandable={{
          indentSize: 0,
          expandedRowRender: (record) => {
            return record.type ? (
              <NestedTypeTable
                fieldService={fieldService}
                typeId={record.type.id}
                typeService={typeService}
              />
            ) : null
          },
        }}
        loading={isLoading}
        pagination={{ disabled: true, hideOnSinglePage: true }}
        rowKey={(f) => f.key}
        size="small"
      />
    )
  },
)
