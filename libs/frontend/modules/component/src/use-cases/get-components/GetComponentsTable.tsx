import { SpinnerWrapper } from '@codelab/frontend/view/components'
import { Table } from 'antd'
import { useGetComponentsQuery } from '../../store'
import { getComponentsTableColumns } from './columns'

export const GetComponentsTable = () => {
  const { data, isLoading } = useGetComponentsQuery()
  const components = data?.components

  return (
    <SpinnerWrapper isLoading={isLoading}>
      <Table
        columns={getComponentsTableColumns}
        dataSource={components}
        pagination={{ position: ['bottomCenter'] }}
        rowKey={(component) => component.id}
      />
    </SpinnerWrapper>
  )
}
