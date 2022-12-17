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

  const dataSource: Array<ComponentColumnData> = [
    ...(value ? value.values() : []),
  ].map((c) => ({
    name: c.name,
    id: c.id,
    apiId: c.api.id,
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
