import { useAsyncState } from '@codelab/frontend/shared/utils'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { StateStore } from '../../store'
import { StoreCellData } from './columns'
import { useStoreTable } from './useStoreTable'

export interface GetStoresTableProps {
  stateStore: StateStore
}

export const GetStoresTable = observer<GetStoresTableProps>(
  ({ stateStore }) => {
    const { columns, rowSelection, pagination } = useStoreTable(stateStore)
    const [getStores, { isLoading }] = useAsyncState(() => stateStore.getAll())
    const storesList = stateStore.storesList

    const storesData: Array<StoreCellData> = storesList.map((a) => ({
      id: a.id,
      name: a.name,
    }))

    useEffect(() => {
      getStores()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <Table
        columns={columns}
        dataSource={storesData}
        loading={isLoading}
        pagination={pagination}
        rowKey={(store) => store.id}
        rowSelection={rowSelection}
      />
    )
  },
)
