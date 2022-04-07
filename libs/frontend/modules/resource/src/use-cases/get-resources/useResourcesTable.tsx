import { headerCellProps } from '@codelab/frontend/view/style'
import { AtomType } from '@codelab/shared/abstract/core'
import { TableColumnProps } from 'antd'
import {
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/lib/table/interface'
import { Resource, resourceRef, ResourceService } from '../../store'
import { ActionColumn } from './columns'
import { ResourceTypeColumnColumn } from './columns/ResourceTypeColumnColumn'

export const useResourcesTable = (resourceService: ResourceService) => {
  const columns: Array<TableColumnProps<Resource>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      onHeaderCell: headerCellProps,
      render: (type: AtomType) => <ResourceTypeColumnColumn type={type} />,
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (_, resource) => (
        <ActionColumn resource={resource} resourceService={resourceService} />
      ),
    },
  ]

  const rowSelection: TableRowSelection<Resource> = {
    type: 'checkbox',
    onChange: (_: Array<React.Key>, selectedRows: Array<Resource>) => {
      resourceService.setSelectedResources(
        selectedRows.map((a) => resourceRef(a.id)),
      )
    },
  }

  const pagination: TablePaginationConfig = {
    position: ['bottomCenter'],
    defaultPageSize: 25,
  }

  return { columns, rowSelection, pagination }
}
