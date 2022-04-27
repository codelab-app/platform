import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { IOperation, IOperationService } from '@codelab/shared/abstract/core'
import { TableColumnProps } from 'antd'
import {
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/lib/table/interface'
import { operationRef } from '../../../store'
import { ActionColumn, ConfigColumn } from './columns'

export const useOperationTable = (operationService: IOperationService) => {
  const columns: Array<TableColumnProps<IOperation>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('name'),
    },
    {
      title: 'Config',
      dataIndex: 'config',
      key: 'config',
      onHeaderCell: headerCellProps,
      fixed: true,
      render: (text, operation) => <ConfigColumn operation={operation} />,
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (text, operation) => (
        <ActionColumn
          operation={operation}
          operationService={operationService}
        />
      ),
    },
  ]

  const rowSelection: TableRowSelection<IOperation> = {
    type: 'checkbox',
    onChange: (_: Array<React.Key>, selectedRows: Array<IOperation>) => {
      operationService.setSelectedOperations(
        selectedRows.map((a) => operationRef(a.id)),
      )
    },
  }

  const pagination: TablePaginationConfig = {
    position: ['bottomCenter'],
    defaultPageSize: 25,
  }

  return { columns, rowSelection, pagination }
}
