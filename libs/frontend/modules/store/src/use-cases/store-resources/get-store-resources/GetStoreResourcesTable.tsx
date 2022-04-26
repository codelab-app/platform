import {
  RESOURCE_SERVICE,
  STORE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useCurrentStore } from '../../../hooks'
import { useStoreResourcesTable } from './useStoreResourcesTable'

export const GetStoreResourcesTable = observer<
  WithServices<RESOURCE_SERVICE | STORE_SERVICE>
>(({ storeService, resourceService }) => {
  const { store } = useCurrentStore(storeService)
  const { columns, pagination } = useStoreResourcesTable(resourceService)

  return (
    <Table
      columns={columns}
      dataSource={store?.resourcesList}
      pagination={pagination}
      rowKey={(resource) => resource.id}
    />
  )
})
