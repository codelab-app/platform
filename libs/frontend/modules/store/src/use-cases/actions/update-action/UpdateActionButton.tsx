import { EditOutlined } from '@ant-design/icons'
import { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { IActionService } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { actionRef } from '../../../store'

type UpdateActionButtonProps = UpdateButtonProps & {
  actionService: IActionService
}

export const UpdateActionButton = observer<UpdateActionButtonProps>(
  ({ id, disabled, actionService }) => (
    <Button
      disabled={disabled}
      ghost
      icon={<EditOutlined />}
      onClick={() => actionService.updateModal.open(actionRef(id))}
      size="small"
      type="primary"
    />
  ),
)
