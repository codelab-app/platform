import type {
  IFieldService,
  ITypeService,
  IUnionType,
  IUnionTypeRecord,
} from '@codelab/frontend/abstract/core'
import { headerCellProps } from '@codelab/frontend/presentation/view'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { Space } from 'antd'
import type { ColumnProps } from 'antd/lib/table'
import Table from 'antd/lib/table'
import { Observer, observer } from 'mobx-react-lite'
import React from 'react'
import { CreateFieldButton } from '../../../fields'
import { TypeDetailsTable } from './TypeDetailsTable'

interface UnionTypeTableProps {
  fieldService: IFieldService
  isLoading: boolean
  typeService: ITypeService
  unionType: IUnionType
}

export const UnionTypeTable = observer<UnionTypeTableProps>(
  ({ fieldService, isLoading, typeService, unionType }) => {
    const columns: Array<ColumnProps<IUnionTypeRecord>> = [
      {
        dataIndex: 'name',
        key: 'name',
        onHeaderCell: headerCellProps,
        title: 'Member Type',
      },
      {
        key: 'action',
        onHeaderCell: headerCellProps,
        render: (text, record) => (
          <Observer>
            {() => (
              <Space size="middle">
                {record.kind === ITypeKind.InterfaceType ? (
                  <CreateFieldButton interfaceId={record.id} />
                ) : null}
              </Space>
            )}
          </Observer>
        ),
        title: 'Action',
        width: 100,
      },
    ]

    const dataSource = unionType.typesOfUnionType.map((type) => {
      return {
        id: type.current.id,
        kind: type.current.kind,
        name: type.current.name,
      }
    })

    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        expandable={{
          expandedRowRender: (record) => {
            return record.id ? <TypeDetailsTable typeId={record.id} /> : null
          },
        }}
        loading={isLoading}
        pagination={{ disabled: false, hideOnSinglePage: true }}
        rowKey={({ id }) => id}
        size="small"
      />
    )
  },
)
