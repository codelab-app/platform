import { DeleteFilled, EditFilled } from '@ant-design/icons'
import {
  IAnyType,
  IInterfaceType,
  ITypeService,
  IValidationRules,
} from '@codelab/frontend/abstract/core'
import { ListItemEditButton } from '@codelab/frontend/view/components'
import { Nullish } from '@codelab/shared/abstract/types'
import { Button, Divider, Space, Table, TableColumnProps, Tag } from 'antd'
import { Observer, observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { fieldRef, typeRef } from '../../../store'
import { UpdateTypeModal } from '../../types'

export type FieldsTableProps = {
  interfaceType?: IInterfaceType
  isLoading: boolean
  hideActions?: boolean
} & { typeService: ITypeService }

interface ValidationRuleTag {
  key: string
  value: string | number | boolean
}

const getValidationRuleTagsArray = (
  validationRules: Nullish<IValidationRules>,
) => {
  const rules: Array<ValidationRuleTag> = []

  if (!validationRules) {
    return rules
  }

  Object.entries(validationRules).forEach(([_, ruleCategory]) => {
    Object.entries(ruleCategory).forEach(([key, value]) => {
      rules.push({ key, value: value as string | number | boolean })
    })
  })

  return rules
}

interface CellData {
  id: string
  name: Nullish<string>
  description: Nullish<string>
  key: string
  type?: {
    id: string
    name: string
    kind: string
  }
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
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        onHeaderCell: headerCellProps,
        render: (type: IAnyType) => (
          <Space>
            {type.name} ({type.kind})
            <ListItemEditButton
              onClick={() => typeService.updateModal.open(typeRef(type.id))}
            />
          </Space>
        ),
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
      type: {
        id: f.type.maybeCurrent?.id ?? '',
        name: f.type.maybeCurrent?.name ?? '',
        kind: f.type.maybeCurrent?.kind ?? '',
      },
      description: f.description || '',
      validationRules: getValidationRuleTagsArray(f.validationRules),
    }))

    return (
      <>
        <UpdateTypeModal typeService={typeService} />
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
      </>
    )
  },
)
