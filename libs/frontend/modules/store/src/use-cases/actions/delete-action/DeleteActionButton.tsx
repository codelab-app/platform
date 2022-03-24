import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { actionRef, ActionService } from '../../../store'

export interface DeleteActionButton extends DeleteButtonProps {
  actionService: ActionService
}

export const DeleteActionButton = observer(
  ({ disabled, ids, actionService }: DeleteActionButton) => {
    return (
      <Button
        danger
        disabled={disabled}
        icon={<DeleteOutlined />}
        onClick={() => actionService.deleteModal.open(actionRef(ids[0]))}
        size="small"
      />
    )
  },
)
