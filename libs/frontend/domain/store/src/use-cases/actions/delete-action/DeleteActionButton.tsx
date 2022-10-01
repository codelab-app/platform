import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { IActionService } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { actionRef } from '../../../store'

type DeleteActionButtonProps = DeleteButtonProps & {
  actionService: IActionService
}

export const DeleteActionButton = observer<DeleteActionButtonProps>(
  ({ disabled, ids, actionService }) => (
    <Button
      danger
      disabled={disabled}
      icon={<DeleteOutlined />}
      onClick={() => actionService.deleteModal.open(actionRef(ids[0]))}
      size="small"
    />
  ),
)
