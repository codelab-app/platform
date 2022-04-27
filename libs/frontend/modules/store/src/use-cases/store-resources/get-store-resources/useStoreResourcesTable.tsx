import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { IResourceService } from '@codelab/shared/abstract/core'
import { TableColumnProps } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table/interface'
import { ActionColumn } from './columns'

export const useStoreResourcesTable = (resourceService: IResourceService) => {
  const columns: Array<TableColumnProps<any>> = [
    {
      title: 'Resource Key',
      dataIndex: 'key',
      key: 'key',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('key'),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'resourceName',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('name'),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'resourceType',
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
