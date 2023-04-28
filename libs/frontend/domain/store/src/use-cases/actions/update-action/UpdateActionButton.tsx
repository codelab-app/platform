import { EditOutlined } from '@ant-design/icons'
import type { IActionService } from '@codelab/frontend/abstract/core'
import { actionRef } from '@codelab/frontend/abstract/core'
import type { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

type UpdateActionButtonProps = UpdateButtonProps & {
  actionService: IActionService
}

export const UpdateActionButton = observer<UpdateActionButtonProps>(
  ({ actionService, disabled, id }) => (
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
