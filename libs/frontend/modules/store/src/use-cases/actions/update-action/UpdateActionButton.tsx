import { EditOutlined } from '@ant-design/icons'
import { ACTION_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { actionRef } from '../../../store'

type UpdateActionButtonProps = WithServices<ACTION_SERVICE> & UpdateButtonProps

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
