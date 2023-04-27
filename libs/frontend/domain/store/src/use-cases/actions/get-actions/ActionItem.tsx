import { FileOutlined } from '@ant-design/icons'
import type { IAction } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/presentation/view'
import { List, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { actionRef } from '../../../store'

export const ActionItem = observer<{ action: IAction }>(({ action }) => {
  const { actionService } = useStore()

  const onClickDelete = () => {
    actionService.deleteModal.open(actionRef(action.id))
  }

  const onClickEdit = () => {
    actionService.updateModal.open(actionRef(action.id))
  }

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
})
