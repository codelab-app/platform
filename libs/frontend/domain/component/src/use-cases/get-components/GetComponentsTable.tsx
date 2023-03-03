import type { IComponentService } from '@codelab/frontend/abstract/core'
import { Spinner } from '@codelab/frontend/view/components'
import type { TableColumnProps } from 'antd'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsync } from 'react-use'
import tw from 'twin.macro'
import { ActionColumn } from './columns/ActionColumn'
import { NameColumn } from './columns/NameColumn'
import { PropsColumn } from './columns/PropsColumn'
import type { ComponentColumnData } from './columns/types'

export const GetComponentsTable = observer<{
  componentService: IComponentService
}>(({ componentService }) => {
  const { loading, value } = useAsync(async () => {
    await componentService.getAll()

    return componentService.components
  }, [])

  const headerCellProps = () => ({
    style: tw`font-semibold text-gray-900`,
  })

  const getComponentsTableColumns: Array<
    TableColumnProps<ComponentColumnData>
  > = [
    {
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      render: (_, component) => <NameColumn component={component} />,
      title: 'Name',
    },
    {
      dataIndex: 'props',
      key: 'props',
      onHeaderCell: headerCellProps,
      render: (_, component) => <PropsColumn component={component} />,
      title: 'Props API',
      width: 100,
    },
    {
      key: 'action',
      onHeaderCell: headerCellProps,
      render: (_, component) => (
        <ActionColumn
          component={component}
          componentService={componentService}
        />
      ),
      title: 'Action',
      width: 100,
    },
  ]

  const dataSource: Array<ComponentColumnData> = [
    ...(value ? value.values() : []),
  ].map((component) => ({
    apiId: component.api.id,
    id: component.id,
    name: component.name,
  }))

  return (
    <Spinner isLoading={loading}>
      <Table
        columns={getComponentsTableColumns}
        dataSource={dataSource}
        pagination={{ position: ['bottomCenter'] }}
        rowKey={(component) => component.id}
      />
    </Spinner>
  )
})
