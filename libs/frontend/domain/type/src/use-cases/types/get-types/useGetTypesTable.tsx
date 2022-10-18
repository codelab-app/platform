import { ITypeRecord, ITypeService } from '@codelab/frontend/abstract/core'
import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { ColumnsType } from 'antd/lib/table'
import { TableRowSelection } from 'antd/lib/table/interface'
import { arraySet } from 'mobx-keystone'
import React from 'react'
import { ActionColumn } from './columns'

export const useTypesTable = (typeService: ITypeService) => {
  const columns: ColumnsType<ITypeRecord> = [
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

  const rowSelection: TableRowSelection<ITypeRecord> = {
    type: 'checkbox',
    onChange: (_: Array<React.Key>, selectedRows: Array<ITypeRecord>) => {
      typeService.setSelectedIds(arraySet(selectedRows.map(({ id }) => id)))
    },
  }

  return {
    rowSelection,
    columns,
  }
}
