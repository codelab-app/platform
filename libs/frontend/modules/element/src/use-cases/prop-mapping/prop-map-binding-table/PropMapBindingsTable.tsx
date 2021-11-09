import { IElement } from '@codelab/frontend/abstract/core'
import { headerCellProps } from '@codelab/frontend/style'
import {
  EntityType,
  ListItemDeleteButton,
  ListItemEditButton,
  useColumnSearchProps,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import { ElementTree } from '@codelab/shared/core'
import { Space, Table, TableColumnProps } from 'antd'
import React from 'react'
import { PropMapBindingFragment } from '../../../graphql'

export interface PropMapBindingsTableProps {
  element: IElement
  tree: ElementTree
}

export const PropMapBindingsTable = ({
  tree,
  element,
}: PropMapBindingsTableProps) => {
  const { openUpdateModal, openDeleteModal } = useCrudModalForm(
    EntityType.PropMapBinding,
  )

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
            onClick={() => openUpdateModal(record.id, record)}
          />

          <ListItemDeleteButton
            onClick={() => openDeleteModal([record.id], record)}
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
