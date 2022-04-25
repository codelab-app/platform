import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useCurrentStore } from '../../../hooks'
import { WithStoreResourceService, WithStoreService } from '../../../store'
import { useStoreResourcesTable } from './useStoreResourcesTable'

export const GetStoreResourcesTable = observer<
  WithStoreService & WithStoreResourceService
>(({ storeService, storeResourceService }) => {
  const { store } = useCurrentStore(storeService)
  const { columns, pagination } = useStoreResourcesTable(storeResourceService)

  return (
    <Table
      columns={columns}
      dataSource={store?.resourcesList}
      pagination={pagination}
      rowKey={(resource) => resource.id}
    />
  )
})
