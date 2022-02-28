import { IElement } from '@codelab/frontend/abstract/core'
import {
  ListItemDeleteButton,
  ListItemEditButton,
  useColumnSearchProps,
} from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { IPropMapBinding } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { Space, Table, TableColumnProps } from 'antd'
import React from 'react'
import { usePropMapBindingDispatch } from '../../../hooks'

export interface PropMapBindingsTableProps {
  element: IElement
  tree: ElementTree
}

export const PropMapBindingsTable = ({
  tree,
  element,
}: PropMapBindingsTableProps) => {
  const { openUpdateModal, openDeleteModal } = usePropMapBindingDispatch()

  const columns: Array<TableColumnProps<IPropMapBinding>> = [
    {
      title: 'Source key',
      dataIndex: 'sourceKey',
      key: 'sourceKey',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('sourceKey'),
    },
    {
      title: 'Target Element',
      dataIndex: 'targetElement',
      key: 'targetElement',
      onHeaderCell: headerCellProps,
      render: (value) => (value?.id ? tree.getVertex(value?.id)?.name : ''),
    },
    {
      title: 'Target key',
      dataIndex: 'targetKey',
      key: 'targetKey',
      onHeaderCell: headerCellProps,
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <ListItemEditButton
            onClick={() =>
              openUpdateModal({
                updateId: record.id,
                entity: record,
              })
            }
          />

          <ListItemDeleteButton
            onClick={() =>
              openDeleteModal({
                deleteIds: [record.id],
                entity: record,
              })
            }
          />
        </Space>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={element.propMapBindings || []}
      pagination={{
        position: ['bottomCenter'],
        defaultPageSize: 25,
        hideOnSinglePage: true,
      }}
      rowKey={(binding) => binding.id}
    />
  )
}

PropMapBindingsTable.displayName = 'PropMapBindingsTable'
