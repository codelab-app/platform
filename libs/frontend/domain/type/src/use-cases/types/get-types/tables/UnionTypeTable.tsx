import type {
  IFieldService,
  ITypeService,
  IUnionType,
  IUnionTypeRecord,
} from '@codelab/frontend/abstract/core'
import { headerCellProps } from '@codelab/frontend/view/style'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { Space } from 'antd'
import type { ColumnProps } from 'antd/lib/table'
import Table from 'antd/lib/table'
import { Observer, observer } from 'mobx-react-lite'
import React from 'react'
import { CreateFieldButton } from '../../../fields'
import { TypeDetailsTable } from './TypeDetailsTable'

interface UnionTypeTableProps {
  unionType: IUnionType
  typeService: ITypeService
  fieldService: IFieldService
  isLoading: boolean
}

export const UnionTypeTable = observer<UnionTypeTableProps>(
  ({ fieldService, isLoading, typeService, unionType }) => {
    const columns: Array<ColumnProps<IUnionTypeRecord>> = [
      {
        title: 'Member Type',
        dataIndex: 'name',
        key: 'name',
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
                {record.kind === ITypeKind.InterfaceType ? (
                  <CreateFieldButton
                    fieldService={fieldService}
                    interfaceId={record.id}
                  />
                ) : null}
              </Space>
            )}
          </Observer>
        ),
      },
    ]

    const dataSource = unionType.typesOfUnionType.map((type) => {
      return {
        kind: type.current.kind,
        id: type.current.id,
        name: type.current.name,
      }
    })

    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        expandable={{
          expandedRowRender: (record) => {
            return record.id ? (
              <TypeDetailsTable
                fieldService={fieldService}
                typeId={record.id}
                typeService={typeService}
              />
            ) : null
          },
        }}
        loading={isLoading}
        pagination={{ disabled: false, hideOnSinglePage: true }}
        rowKey={(f) => f.id}
        size="small"
      />
    )
  },
)
