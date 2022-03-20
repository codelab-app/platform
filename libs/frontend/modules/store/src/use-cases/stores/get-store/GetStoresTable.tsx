import { useAsyncState } from '@codelab/frontend/shared/utils'
import { TreeService } from '@codelab/shared/core'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { StateStore } from '../../../store'
import { useStoreTable } from './useStoreTable'

export interface GetStoresTableProps {
  stateStore: StateStore
}

export const GetStoresTable = observer<GetStoresTableProps>(
  ({ stateStore }) => {
    const { columns, rowSelection, pagination } = useStoreTable(stateStore)

    const [getStores, { isLoading }] = useAsyncState(() =>
      stateStore.getStoresGraphs(),
    )

    const storesList = new TreeService({
      vertices: [...stateStore.storesGraphs.vertices.values()],
      edges: stateStore.storesGraphs.edges,
    })

    const storesTrees = storesList.getAntdTrees()

    useEffect(() => {
      getStores()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <Table
        columns={columns}
        dataSource={storesTrees}
        loading={isLoading}
        pagination={pagination}
        rowKey={(store) => store.key}
        rowSelection={rowSelection}
      />
    )
  },
)
