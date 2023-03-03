import type {
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
import type { ColumnProps } from 'antd/lib/table/Column'
import isNil from 'lodash/isNil'
import { Observer, observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { fieldRef, typeRef } from '../../../../store'
import { CreateFieldButton } from '../../../fields/create-field'
import { getValidationRuleTagsArray } from '../../../fields/get-fields/validation'
import { TypeDetailsTable } from '../../index'

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
        dataIndex: 'name',
        key: 'name',
        onHeaderCell: headerCellProps,
        title: 'Field Name',
      },
      {
        dataIndex: 'key',
        key: 'key',
        onHeaderCell: headerCellProps,
        title: 'Key',
      },
      {
        dataIndex: 'description',
        key: 'description',
        onHeaderCell: headerCellProps,
        title: 'Description',
      },
      Table.EXPAND_COLUMN,
      {
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
        title: 'Type',
      },
      {
        dataIndex: 'type',
        key: 'type',
        onHeaderCell: headerCellProps,
        render: (type: IAnyType) => <Space>{type.kind}</Space>,
        title: 'Kind',
      },
      {
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
        title: 'Validation',
      },
      {
        dataIndex: 'defaultValues',
        key: 'defaultValues',
        onHeaderCell: headerCellProps,
        render: (_, record) => {
          const field = interfaceType.fields.find(
            ({ key }) => key === record.key,
          )

          const showValue =
            record.type?.kind === ITypeKind.PrimitiveType &&
            !isNil(field?.defaultValues)

          return showValue ? <div>{String(field?.defaultValues)}</div> : ''
        },
        title: 'Default',
      },
      {
        key: 'action',
        onHeaderCell: headerCellProps,
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
                    fieldService.updateModal.open(fieldRef(record.id))
                  }}
                />
                <ListItemDeleteButton
                  onClick={() => {
                    fieldService.deleteModal.open(fieldRef(record.id))
                  }}
                />
              </Space>
            )}
          </Observer>
        ),
        title: 'Action',
        width: 100,
      },
    ]

    const dataSource: Array<IFieldRecord> = interfaceType.fields.map(
      (field) => {
        return {
          dependentTypes: [],
          description: field.description || '',
          id: field.id,
          key: field.key,
          name: field.name || '',
          type: {
            id: field.type.maybeCurrent?.id ?? '',
            kind: field.type.maybeCurrent?.kind ?? '',
            name: field.type.maybeCurrent?.name ?? '',
          },
          validationRules: getValidationRuleTagsArray(field.validationRules),
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
          expandedRowRender: (record) => {
            return record.type ? (
              <TypeDetailsTable
                fieldService={fieldService}
                typeId={record.type.id}
                typeService={typeService}
              />
            ) : null
          },
          indentSize: 0,
        }}
        loading={isLoading}
        pagination={{ disabled: false, hideOnSinglePage: true, pageSize: 25 }}
        rowKey={({ key }) => key}
        size="small"
      />
    )
  },
)
