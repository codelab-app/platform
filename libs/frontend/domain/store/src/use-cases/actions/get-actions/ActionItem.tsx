import { FileOutlined } from '@ant-design/icons'
import type { IAction, IActionService } from '@codelab/frontend/abstract/core'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/presentation/view'
import { List, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { actionRef } from '../../../store'

export interface ActionItemProps {
  action: IAction
  actionService: IActionService
}

export const ActionItem = observer<ActionItemProps>(
  ({ action, actionService }) => {
    const onClickDelete = () =>
      actionService.deleteModal.open(actionRef(action.id))

    const onClickEdit = () =>
      actionService.updateModal.open(actionRef(action.id))

    return (
      <List.Item style={{ padding: 8 }}>
        <Space style={{ width: '100%' }}>
          <FileOutlined />
          {action.name}
        </Space>
        <Space>
          <ListItemEditButton onClick={onClickEdit} />
          <ListItemDeleteButton onClick={onClickDelete} />
        </Space>
      </List.Item>
    )
  },
)
