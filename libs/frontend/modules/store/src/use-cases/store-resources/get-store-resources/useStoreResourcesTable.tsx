import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { TableColumnProps } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table/interface'
import { StoreResourceService } from '../../../store'
import { ActionColumn } from './columns'

export const useStoreResourcesTable = (
  storeResourceService: StoreResourceService,
) => {
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
        <ActionColumn
          resource={resource}
          storeResourceService={storeResourceService}
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
