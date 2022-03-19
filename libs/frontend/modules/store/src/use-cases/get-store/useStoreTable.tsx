import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { TableColumnProps } from 'antd'
import {
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/lib/table/interface'
import { DataNode } from 'antd/lib/tree'
import { StateStore, storeRef } from '../../store'
import { ActionColumn } from './columns'

export const useStoreTable = (stateStore: StateStore) => {
  const columns: Array<TableColumnProps<DataNode>> = [
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'name',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('name'),
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (text, store) => (
        <ActionColumn stateStore={stateStore} store={store} />
      ),
    },
  ]

  const rowSelection: TableRowSelection<DataNode> = {
    type: 'checkbox',
    onChange: (_: Array<React.Key>, selectedRows: Array<DataNode>) => {
      stateStore.setSelectedStores(
        selectedRows.map((a) => storeRef(a.key as string)),
      )
    },
  }

  const pagination: TablePaginationConfig = {
    position: ['bottomCenter'],
    defaultPageSize: 25,
  }

  return { columns, rowSelection, pagination }
}
