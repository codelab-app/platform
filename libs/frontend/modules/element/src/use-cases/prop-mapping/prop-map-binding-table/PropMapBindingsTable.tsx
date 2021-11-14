import { IElement } from '@codelab/frontend/abstract/core'
import { headerCellProps } from '@codelab/frontend/style'
import {
  ListItemDeleteButton,
  ListItemEditButton,
  useColumnSearchProps,
} from '@codelab/frontend/view/components'
import { ElementTree } from '@codelab/shared/core'
import { Space, Table, TableColumnProps } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { PropMapBindingFragment } from '../../../graphql'
import { propMapBindingActions } from '../../../store'

export interface PropMapBindingsTableProps {
  element: IElement
  tree: ElementTree
}

export const PropMapBindingsTable = ({
  tree,
  element,
}: PropMapBindingsTableProps) => {
  const dispatch = useDispatch()

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
              dispatch(
                propMapBindingActions.openUpdateModal({
                  updateId: record.id,
                  entity: record,
                }),
              )
            }
          />

          <ListItemDeleteButton
            onClick={() =>
              dispatch(
                propMapBindingActions.openDeleteModal({
                  deleteIds: [record.id],
                  entity: record,
                }),
              )
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
