import {
  OPERATION_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { useCurrentResourceId } from '@codelab/frontend/presenter/container'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useOperationTable } from './useOperationTable'

export const GetOperationsTable = observer<WithServices<OPERATION_SERVICE>>(
  ({ operationService }) => {
    const { columns, rowSelection, pagination } =
      useOperationTable(operationService)

    const resourceId = useCurrentResourceId()

    const [getOperations] = useStatefulExecutor((id: string) =>
      operationService.getAll({ resource: { id } }),
    )

    useEffect(() => {
      if (resourceId) {
        getOperations(resourceId)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resourceId])

    return (
      <Table
        columns={columns}
        dataSource={operationService.operationList(resourceId)}
        pagination={pagination}
        rowKey={(operation) => operation.id}
        rowSelection={rowSelection}
      />
    )
  },
)
