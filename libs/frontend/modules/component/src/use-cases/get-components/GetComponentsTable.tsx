import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Spinner } from '@codelab/frontend/view/components'
import { IComponentService } from '@codelab/shared/abstract/core'
import { Table, TableColumnProps } from 'antd'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import tw from 'twin.macro'
import { ActionColumn } from './columns/ActionColumn'
import { NameColumn } from './columns/NameColumn'
import { PropsColumn } from './columns/PropsColumn'
import { ComponentColumnData } from './columns/types'

export const GetComponentsTable = observer<{
  componentService: IComponentService
}>(({ componentService }) => {
  const [getComponents, { isLoading }] = useStatefulExecutor(() =>
    componentService.getAll(),
  )

  const components = componentService.components
  useEffect(() => {
    getComponents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const headerCellProps = () => ({
    style: tw`font-semibold text-gray-900`,
  })

  const getComponentsTableColumns: Array<
    TableColumnProps<ComponentColumnData>
  > = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      render: (_, component) => <NameColumn component={component} />,
    },
    {
      title: 'Props API',
      dataIndex: 'props',
      key: 'props',
      width: 100,
      onHeaderCell: headerCellProps,
      render: (_, component) => <PropsColumn component={component} />,
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (_, component) => (
        <ActionColumn
          component={component}
          componentService={componentService}
        />
      ),
    },
  ]

  const dataSource: Array<ComponentColumnData> = [...components.values()].map(
    (c) => ({
      name: c.name,
      id: c.id,
      apiId: c.api.id,
    }),
  )

  return (
    <Spinner isLoading={isLoading}>
      <Table
        columns={getComponentsTableColumns}
        dataSource={dataSource}
        pagination={{ position: ['bottomCenter'] }}
        rowKey={(component) => component.id}
      />
    </Spinner>
  )
})
