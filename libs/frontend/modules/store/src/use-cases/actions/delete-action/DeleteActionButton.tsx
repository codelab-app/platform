import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { actionRef, WithActionService } from '../../../store'

type DeleteActionButtonProps = DeleteButtonProps & WithActionService

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
