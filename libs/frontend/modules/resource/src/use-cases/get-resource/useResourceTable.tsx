import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { IResource, IResourceService } from '@codelab/shared/abstract/core'
import { TableColumnProps } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table/interface'
import React from 'react'
import { ActionColumn } from './columns/ActionColumn'

export const useResourceTable = (resourceService: IResourceService) => {
  const columns: Array<TableColumnProps<IResource>> = [
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
      ...useColumnSearchProps('type'),
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (text, resource) => (
        <ActionColumn resource={resource} resourceService={resourceService} />
      ),
    },
  ]

  const pagination: TablePaginationConfig = {
    position: ['bottomCenter'],
    defaultPageSize: 25,
  }

  return { columns, pagination }
}
