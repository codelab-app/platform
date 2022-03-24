import { EditOutlined } from '@ant-design/icons'
import { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { actionRef, ActionService } from '../../../store'

export interface UpdateActionButtonProps extends UpdateButtonProps {
  actionService: ActionService
}

export const UpdateActionButton = observer(
  ({ id, disabled, actionService }: UpdateActionButtonProps) => {
    const onClick = () => {
      if (!id) {
        throw new Error('Action ID is not valid')
      }

      actionService.updateModal.open(actionRef(id))
    }

    return (
      <Button
        disabled={disabled}
        ghost
        icon={<EditOutlined />}
        onClick={onClick}
        size="small"
        type="primary"
      />
    )
  },
)
