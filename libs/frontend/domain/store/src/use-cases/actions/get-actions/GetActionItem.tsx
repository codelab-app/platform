import { FileOutlined } from '@ant-design/icons'
import type {
  IActionService,
  IAnyAction,
} from '@codelab/frontend/abstract/core'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { List, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { actionRef } from '../../../store'

export interface GetActionItemProps {
  action: IAnyAction
  actionService: IActionService
}

export const GetActionItem = observer<GetActionItemProps>(
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
