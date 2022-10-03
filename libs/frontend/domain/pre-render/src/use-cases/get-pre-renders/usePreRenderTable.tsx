import { IPreRender, IPreRenderService } from '@codelab/frontend/abstract/core'
import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { TableColumnProps } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table/interface'
import React from 'react'
import { ActionColumn } from './columns'

export const usePreRenderTable = (preRenderService: IPreRenderService) => {
  const columns: Array<TableColumnProps<Omit<IPreRender, 'writeCache'>>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('name'),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('code'),
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('code'),
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (value, preRender) => (
        <ActionColumn
          preRender={preRender}
          preRenderService={preRenderService}
        />
      ),
    },
  ]

  const pagination: TablePaginationConfig = {
    position: ['bottomCenter'],
    defaultPageSize: 25,
  }

  return { columns, pagination }
}
