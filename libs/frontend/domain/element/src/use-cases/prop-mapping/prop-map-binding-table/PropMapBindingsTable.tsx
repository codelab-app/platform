import {
  ListItemDeleteButton,
  ListItemEditButton,
  useColumnSearchProps,
} from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { IElement, IElementService } from '@codelab/shared/abstract/core'
import { Space, Table, TableColumnProps } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { elementRef } from '../../../store'
import { propMapBindingRef } from '../../../store/prop-map-binding.ref'

export interface PropMapBindingsTableProps {
  elementService: IElementService
  element: IElement
}

interface CellData {
  sourceKey: string
  targetElementName: string
  targetKey: string
  id: string
}

export const PropMapBindingsTable = observer<PropMapBindingsTableProps>(
  ({ element, elementService }) => {
    const columns: Array<TableColumnProps<CellData>> = [
      {
        title: 'Source key',
        dataIndex: 'sourceKey',
        key: 'sourceKey',
        onHeaderCell: headerCellProps,
        ...useColumnSearchProps('sourceKey'),
      },
      {
        title: 'Target Element',
        dataIndex: 'targetElementName',
        key: 'targetElementName',
        onHeaderCell: headerCellProps,
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
                elementService.updatePropMapBindingModal.open({
                  element: elementRef(element.id),
                  propMapBinding: propMapBindingRef(record.id),
                })
              }
            />

            <ListItemDeleteButton
              onClick={() =>
                elementService.deletePropMapBindingModal.open({
                  element: elementRef(element.id),
                  propMapBinding: propMapBindingRef(record.id),
                })
              }
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
      targetElementName: pmb.targetElement?.current.label ?? '',
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
