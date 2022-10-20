import {
  IFieldService,
  ITypeService,
  IUnionMembersRecord,
  IUnionType,
} from '@codelab/frontend/abstract/core'
import { headerCellProps } from '@codelab/frontend/view/style'
import Table, { ColumnProps } from 'antd/lib/table'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { NestedTypeTable } from '../../types/get-types'

interface UnionMembersTableProps {
  unionType: IUnionType
  typeService: ITypeService
  fieldService: IFieldService
  isLoading: boolean
}

export const UnionMembersTable = observer<UnionMembersTableProps>(
  ({ fieldService, isLoading, typeService, unionType }) => {
    const columns: Array<ColumnProps<IUnionMembersRecord>> = [
      {
        title: 'Member Type',
        dataIndex: 'name',
        key: 'name',
        onHeaderCell: headerCellProps,
      },
    ]

    const dataSource = unionType.typesOfUnionType.map((type) => {
      return {
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
              <NestedTypeTable
                fieldService={fieldService}
                typeId={record.id}
                typeService={typeService}
              />
            ) : null
          },
        }}
        loading={isLoading}
        pagination={{ disabled: true, hideOnSinglePage: true }}
        rowKey={(f) => f.id}
        size="small"
      />
    )
  },
)
