import { DeleteOutlined } from '@ant-design/icons'
import type { IActionService } from '@codelab/frontend/abstract/core'
import type { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { actionRef } from '../../../store'

type DeleteActionButtonProps = DeleteButtonProps & {
  actionService: IActionService
}

export const DeleteActionButton = observer<DeleteActionButtonProps>(
  ({ actionService, disabled, ids }) => (
    <Button
      danger
      disabled={disabled}
      icon={<DeleteOutlined />}
      onClick={() =>
        ids[0] && actionService.deleteModal.open(actionRef(ids[0]))
      }
      size="small"
    />
  ),
)
