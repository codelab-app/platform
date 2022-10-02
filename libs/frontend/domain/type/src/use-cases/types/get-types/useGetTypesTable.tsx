import { ITypeService } from '@codelab/frontend/abstract/core'
import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { ColumnsType } from 'antd/lib/table'
import { TableRowSelection } from 'antd/lib/table/interface'
import { arraySet } from 'mobx-keystone'
import React from 'react'
import { TypeRecord } from './columns'
import { ActionColumn } from './columns/ActionColumn'

export const useTypesTable = (typeService: ITypeService) => {
  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('name'),
    },
    {
      title: 'Kind',
      dataIndex: 'typeKind',
      key: 'typeKind',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('typeKind'),
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (text, record) => (
        <ActionColumn type={record} typeService={typeService} />
      ),
    },
  ]

  const rowSelection: TableRowSelection<TypeRecord> = {
    type: 'checkbox',
    onChange: (_: Array<React.Key>, selectedRows: Array<TypeRecord>) => {
      typeService.setSelectedIds(arraySet(selectedRows.map(({ id }) => id)))
    },
  }

  return {
    rowSelection,
    columns,
  }
}
