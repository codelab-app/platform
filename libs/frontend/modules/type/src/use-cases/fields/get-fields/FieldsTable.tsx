import { DeleteFilled, EditFilled } from '@ant-design/icons'
import {
  IInterfaceType,
  ITypeService,
  IValidationRules,
} from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { Button, Divider, Space, Table, TableColumnProps, Tag } from 'antd'
import { Observer, observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { fieldRef, typeRef } from '../../../store'

export type FieldsTableProps = {
  interfaceType?: IInterfaceType
  isLoading: boolean
  hideActions?: boolean
} & { typeService: ITypeService }

interface ValidationRuleTag {
  key: string
  value: string | number | boolean
}

const getValidationRuleTagsArray = (validationRules: IValidationRules) => {
  const rules: Array<ValidationRuleTag> = []

  Object.entries(validationRules).forEach(([_, ruleCategory]) => {
    Object.entries(ruleCategory).forEach(([key, value]) => {
      rules.push({ key, value: value as any })
    })
  })

  return rules
}

interface CellData {
  id: string
  name: Nullish<string>
  description: Nullish<string>
  key: string
  typeKind?: string
  validationRules?: Array<ValidationRuleTag>
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
        title: 'Validation Rules',
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
      validationRules: getValidationRuleTagsArray(f.validationRules),
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
