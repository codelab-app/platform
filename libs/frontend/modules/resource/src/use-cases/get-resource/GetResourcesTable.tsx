import { RESOURCE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useResourceTable } from './useResourceTable'

export const GetResourcesTable = observer<WithServices<RESOURCE_SERVICE>>(
  ({ resourceService }) => {
    const { columns, pagination } = useResourceTable(resourceService)

    const [getResources, { isLoading }] = useStatefulExecutor(() =>
      resourceService.getAll(),
    )

    useEffect(() => {
      getResources()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <Table
        columns={columns}
        dataSource={resourceService.resourceList}
        loading={isLoading}
        pagination={pagination}
        rowKey={(resource) => resource.id}
      />
    )
  },
)
