import {
  ListItemDeleteButton,
  ListItemEditButton,
  useColumnSearchProps,
} from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { Space, Table, TableColumnProps } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export interface PropMapBindingsTableProps extends WithElementService {
  element: Element
}

export const PropMapBindingsTable = ({
  tree,
  element,
}: PropMapBindingsTableProps) => {
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
          // onClick={() =>
          //   openUpdateModal({
          //     updateId: record.id,
          //     entity: record,
          //   })
          // }
          />

          <ListItemDeleteButton
          // onClick={() =>
          //   openDeleteModal({
          //     deleteIds: [record.id],
          //     entity: record,
          //   })
          // }
          />
        </Space>
      ),
    },
  ]

    const dataSource: Array<CellData> = Array.from(
      element.propMapBindings.values(),
    ).map((pmb) => ({
      id: pmb.id,
      sourceKey: pmb.sourceKey,
      targetElementName: pmb.targetElement?.current.name ?? '',
      targetKey: pmb.targetKey,
    }))

    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          position: ['bottomCenter'],
          defaultPageSize: 25,
          hideOnSinglePage: true,
        }}
        rowKey={(binding) => binding.id}
      />
    )
  },
)

PropMapBindingsTable.displayName = 'PropMapBindingsTable'
