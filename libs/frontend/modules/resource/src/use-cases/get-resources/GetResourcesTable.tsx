import { useLoadingState } from '@codelab/frontend/shared/utils'
import { SpinnerWrapper } from '@codelab/frontend/view/components'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { WithResourceService } from '../../store'
import { useResourcesTable } from './useResourcesTable'

export const GetResourcesTable = observer(
  ({ resourceService }: WithResourceService) => {
    const { columns, pagination, rowSelection } =
      useResourcesTable(resourceService)

    const [getResources, { isLoading }] = useLoadingState(() =>
      resourceService.getAll(),
    )

    useEffect(() => {
      getResources()
    }, [])

    return (
      <SpinnerWrapper isLoading={isLoading}>
        <Table
          columns={columns}
          dataSource={resourceService.resourceList}
          pagination={pagination}
          rowKey={(component) => component.id}
          rowSelection={rowSelection}
        />
      </SpinnerWrapper>
    )
  },
)
