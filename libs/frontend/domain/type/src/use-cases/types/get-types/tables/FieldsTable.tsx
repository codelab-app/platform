import type {
  IField,
  IFieldRecord,
  IFieldService,
  IInterfaceType,
  IType,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { faArrowsUpDownLeftRight } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider, Space, Table, Tag } from 'antd'
import type { ColumnProps } from 'antd/lib/table/Column'
import isNil from 'lodash/isNil'
import { Observer, observer } from 'mobx-react-lite'
import React from 'react'
import ReactDragListView from 'react-drag-listview'
import tw from 'twin.macro'
import { fieldRef, typeRef } from '../../../../store'
import { CreateFieldButton } from '../../../fields/create-field'
import { getValidationRuleTagsArray } from '../../../fields/get-fields/validation'
import { TypeDetailsTable } from '../../index'

export interface FieldsTableProps {
  fieldService: IFieldService
  hideActions?: boolean
  interfaceType: IInterfaceType
  isLoading: boolean
  typeService: ITypeService
}

const headerCellProps = () => ({ style: tw`font-semibold text-gray-900` })

export const FieldsTable = observer<FieldsTableProps>(
  ({ fieldService, hideActions, interfaceType, isLoading, typeService }) => {
    const columns: Array<ColumnProps<IFieldRecord>> = [
      {
        key: '',
        render: (text, record, index) => (
          <span className="drag-handle">
            <FontAwesomeIcon icon={faArrowsUpDownLeftRight} size="lg" />
          </span>
        ),
        title: '',
      },
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
        render: (type: IType) => (
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
        render: (type: IType) => <Space>{type.kind}</Space>,
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

    const compareNodes = (field1: IField, field2: IField) => {
      let node1 = field1
      let node2 = field2
      const pathA = [field1.id]
      const pathB = [field2.id]

      while (node1.prevSibling) {
        node1 = interfaceType.fields.find(
          (node) => node.id === node1.prevSibling?.id,
        ) as IField
        pathA.unshift(node1.id)
      }

      while (node2.prevSibling) {
        node2 = interfaceType.fields.find(
          (node) => node.id === node2.prevSibling?.id,
        ) as IField
        pathB.unshift(node2.id)
      }

      const result = pathA.join().localeCompare(pathB.join())

      return result !== 0 ? result : field1.id.localeCompare(field2.id)
    }

    const dataSource: Array<IFieldRecord> = interfaceType.fields
      .sort(compareNodes)
      .map((field) => {
        return {
          dependentTypes: [],
          description: field.description || '',
          id: field.id,
          key: field.key,
          name: field.name || '',
          nextSibling: field.nextSibling,
          prevSibling: field.prevSibling,
          type: {
            id: field.type.maybeCurrent?.id ?? '',
            kind: field.type.maybeCurrent?.kind ?? '',
            name: field.type.maybeCurrent?.name ?? '',
          },
          validationRules: getValidationRuleTagsArray(field.validationRules),
        }
      })

    const onDragEnd = async (fromIndex: number, toIndex: number) => {
      if (fromIndex === toIndex) {
        return
      }
      if (fromIndex < toIndex && toIndex !== 0) {
        await fieldService.moveFieldAsNextSibling({
          field: { id: dataSource[fromIndex]?.id as string },
          targetField: { id: dataSource[toIndex]?.id as string },
        })
      } else if (fromIndex > toIndex ) {
        await fieldService.moveFieldAsPrevSibling({
          field: { id: dataSource[fromIndex]?.id as string },
          targetField: { id: dataSource[toIndex]?.id as string },
        })
      }
    }

    return (
      <ReactDragListView handleSelector="span" onDragEnd={onDragEnd}>
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
                <TypeDetailsTable typeId={record.type.id} />
              ) : null
            },
            indentSize: 0,
          }}
          loading={isLoading}
          pagination={{ disabled: false, hideOnSinglePage: true, pageSize: 25 }}
          rowKey={({ key }) => key}
          size="small"
        />
      </ReactDragListView>
    )
  },
)
