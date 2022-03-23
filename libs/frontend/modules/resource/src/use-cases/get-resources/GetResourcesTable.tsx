import { useLoadingState } from '@codelab/frontend/shared/utils'
import { SpinnerWrapper } from '@codelab/frontend/view/components'
import { Table } from 'antd'
import { useEffect } from 'react'
import { WithResourceService } from '../..'
import { columns } from './columns'


export const GetResourcesTable = ({ resourceService }: WithResourceService) => {
  const [getResources, { isLoading }] = useLoadingState(() =>
    resourceService.getAll(),
  )

  useEffect(() => { getResources() }, [])


  return (
    <SpinnerWrapper isLoading={isLoading}>
      <Table dataSource={resourceService.resourceList} columns={columns} pagination={{ position: ['bottomCenter'] }}
        rowKey={(component) => component.id} />
    </SpinnerWrapper>
  )
}
