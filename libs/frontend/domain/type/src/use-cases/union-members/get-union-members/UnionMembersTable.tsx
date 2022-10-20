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
import { useAsync } from 'react-use'
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

    const {
      loading,
      error,
      value: dataSource,
    } = useAsync(async () =>
      Promise.all(
        unionType.typesOfUnionType.map(async ({ id }) => {
          const name = (await typeService.getOne(id))?.name || ''

          return {
            id,
            name,
          }
        }),
      ),
    )

    return !error ? (
      <Table
        columns={columns}
        dataSource={dataSource || []}
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
        loading={loading || isLoading}
        pagination={{ disabled: true, hideOnSinglePage: true }}
        rowKey={(f) => f.id}
        size="small"
      />
    ) : null
  },
)
