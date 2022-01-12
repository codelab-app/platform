import { IElement } from '@codelab/frontend/abstract/core'
import {
  ListItemDeleteButton,
  ListItemEditButton,
  useColumnSearchProps,
} from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { ElementTree } from '@codelab/shared/core'
import { Space, Table, TableColumnProps } from 'antd'
import React from 'react'
import { PropMapBindingFragment } from '../../../graphql'
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

  const columns: Array<TableColumnProps<PropMapBindingFragment>> = [
    {
      title: 'Source key',
      dataIndex: 'sourceKey',
      key: 'sourceKey',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('sourceKey'),
    },
    {
      title: 'Target Element',
      dataIndex: 'targetElementId',
      key: 'targetElementId',
      onHeaderCell: headerCellProps,
      render: (value) => {
        return tree.getVertex(value)?.name ?? value
      },
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
      pagination={{
        position: ['bottomCenter'],
        defaultPageSize: 25,
        hideOnSinglePage: true,
      }}
      dataSource={element.propMapBindings}
      columns={columns}
      rowKey={(binding) => binding.id}
    />
  )
}

PropMapBindingsTable.displayName = 'PropMapBindingsTable'
