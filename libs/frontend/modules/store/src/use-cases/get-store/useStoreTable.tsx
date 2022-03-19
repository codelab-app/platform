import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { TableColumnProps } from 'antd'
import {
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/lib/table/interface'
import { StateStore, StoreModel, storeRef } from '../../store'
import { ActionColumn, StoreCellData } from './columns'

export const useStoreTable = (stateStore: StateStore) => {
  const columns: Array<TableColumnProps<StoreModel>> = [
    {
      title: 'Name',
      dataIndex: 'name',
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

  const rowSelection: TableRowSelection<StoreCellData> = {
    type: 'checkbox',
    onChange: (_: Array<React.Key>, selectedRows: Array<StoreCellData>) => {
      stateStore.setSelectedStores(selectedRows.map((a) => storeRef(a.id)))
    },
  }

  const pagination: TablePaginationConfig = {
    position: ['bottomCenter'],
    defaultPageSize: 25,
  }

  return { columns, rowSelection, pagination }
}
