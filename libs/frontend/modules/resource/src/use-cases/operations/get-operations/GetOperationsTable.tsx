import { useCurrentResourceId } from '@codelab/frontend/presenter/container'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { WithOperationService, WithResourceService } from '../../../store'
import { useOperationTable } from './useOperationTable'

type GetOperationsTableProps = WithOperationService & WithResourceService

export const GetOperationsTable = observer<GetOperationsTableProps>(
  ({ operationService }) => {
    const { columns, rowSelection, pagination } =
      useOperationTable(operationService)

    const resourceId = useCurrentResourceId()

    const [getOperations] = useLoadingState((id: string) =>
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
