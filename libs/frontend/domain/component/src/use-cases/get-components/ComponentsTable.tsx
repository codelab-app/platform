import type { IComponent } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/presentation/container'
import { useTablePagination } from '@codelab/frontend/shared/utils'
import type { TableColumnProps } from 'antd'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { ActionColumn } from './columns/ActionColumn'
import { NameColumn } from './columns/NameColumn'
import { PropsColumn } from './columns/PropsColumn'
import type { ComponentColumnData } from './columns/types'

export const ComponentsTable = observer(() => {
  const { componentService } = useStore()

  const { data, filter, handleChange, isLoading, pagination } =
    useTablePagination<IComponent, { name: string }>({
      filterTypes: { name: 'string' },
      paginationService: componentService.paginationService,
      pathname: PageType.Components,
    })

  useEffect(() => {
    void componentService.getAll()
  }, [])

  const headerCellProps = () => ({
    className: 'font-semibold text-gray-900',
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
      render: (_, component) => <ActionColumn component={component} />,
      title: 'Action',
      width: 100,
    },
  ]

  const dataSource: Array<ComponentColumnData> = data.map((component) => ({
    apiId: component.api.id,
    id: component.id,
    name: component.name,
  }))

  return (
    <Table
      columns={getComponentsTableColumns}
      dataSource={dataSource}
      pagination={{ position: ['bottomCenter'] }}
      rowKey={(component) => component.id}
    />
  )
})
