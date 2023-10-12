import { EditOutlined } from '@ant-design/icons'
import type { IAuthGuardService } from '@codelab/frontend/abstract/domain'
import { authGuardRef } from '@codelab/frontend/abstract/domain'
import type { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export type UpdateAuthGuardButtonProps = UpdateButtonProps & {
  authGuardService: IAuthGuardService
}

export const UpdateAuthGuardButton = observer(
  ({ authGuardService, disabled, id }: UpdateAuthGuardButtonProps) => (
    <Button
      disabled={disabled}
      ghost
      icon={<EditOutlined />}
      onClick={() => authGuardService.updateModal.open(authGuardRef(id))}
      size="small"
      type="primary"
    />
  ),
)
